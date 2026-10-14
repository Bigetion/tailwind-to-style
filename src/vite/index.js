import path from "node:path";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import { transformSync } from "@babel/core";

function readStaticValue(node) {
  if (node.type === "StringLiteral" || node.type === "NumericLiteral" || node.type === "BooleanLiteral") {
    return node.value;
  }
  if (node.type === "NullLiteral") return null;
  if (node.type === "UnaryExpression" && node.operator === "-" && node.argument.type === "NumericLiteral") {
    return -node.argument.value;
  }
  if (node.type === "TemplateLiteral" && node.expressions.length === 0) {
    return node.quasis[0].value.cooked;
  }
  if (node.type === "ArrayExpression") {
    return node.elements.map((element) => {
      if (!element || element.type === "SpreadElement") {
        throw new TypeError("Array spreads are not supported in statically compiled tw() configs.");
      }
      return readStaticValue(element);
    });
  }
  if (node.type === "ObjectExpression") {
    return node.properties.reduce((result, property) => {
      if (property.type !== "ObjectProperty" || property.computed || property.shorthand) {
        throw new TypeError("Object spreads, computed keys, and shorthand values are not supported in statically compiled tw() configs.");
      }
      const key = property.key.type === "Identifier" ? property.key.name : String(readStaticValue(property.key));
      result[key] = readStaticValue(property.value);
      return result;
    }, {});
  }
  throw new TypeError(`Unsupported dynamic value in statically compiled tw() config (${node.type}).`);
}

function normalizeVariantValue(value) {
  if (value === undefined || value === null) return null;
  if (value === true || value === false) return String(value);
  if (typeof value === "number") return String(value);
  return value;
}

function createStaticResolver(styleApi, config) {
  if (config.responsiveVariants?.length) {
    throw new TypeError("Responsive variants are not yet supported by the Vite static tw() compiler.");
  }

  const selector = styleApi(config);
  if (typeof selector !== "function") return JSON.stringify(selector);

  const variantKeys = Object.keys(config.variants || {});
  const variantValues = variantKeys.map((key) => {
    const values = Object.keys(config.variants[key] || {});
    return [undefined, ...values];
  });
  const combinationCount = variantValues.reduce((count, values) => count * values.length, 1);
  if (combinationCount > 4096) {
    throw new RangeError(
      `tw() config "${config.name || "anonymous"}" has ${combinationCount} variant combinations; the static compiler limit is 4096.`
    );
  }

  const classMap = {};
  const props = {};
  function addCombination(index) {
    if (index === variantKeys.length) {
      const values = variantKeys.map((key) => normalizeVariantValue(props[key]));
      classMap[JSON.stringify(values)] = selector(props);
      return;
    }
    const key = variantKeys[index];
    for (const value of variantValues[index]) {
      props[key] = value;
      addCombination(index + 1);
    }
    delete props[key];
  }
  addCombination(0);

  const defaults = config.defaultVariants || {};
  const defaultValues = variantKeys.map((key) => normalizeVariantValue(defaults[key]));
  const defaultResult = classMap[JSON.stringify(defaultValues)];
  const serializedMap = JSON.stringify(classMap);
  const serializedKeys = JSON.stringify(variantKeys);
  const serializedDefaults = JSON.stringify(defaults);
  const serializedFallback = JSON.stringify(defaultResult);
  const serializedValues = JSON.stringify(
    Object.fromEntries(variantKeys.map((key) => [key, Object.keys(config.variants[key] || {})]))
  );

  return `((map,keys,defaults,fallback,variantValues)=>(props={})=>{const values=keys.map(key=>{let value=Object.prototype.hasOwnProperty.call(props,key)?props[key]:defaults[key];if(value!==undefined&&value!==null&&typeof value==="object")throw new TypeError("Responsive variant props are not supported by the static tw() compiler.");if(value!==undefined&&value!==null&&!variantValues[key]?.includes(String(value)))value=undefined;return value===undefined||value===null?null:typeof value==="boolean"||typeof value==="number"?String(value):value});return map[JSON.stringify(values)]??fallback})(${serializedMap},${serializedKeys},${serializedDefaults},${serializedFallback},${serializedValues})`;
}

function compileTwCalls(code, apiSpecifier, styleApi) {
  let changed = false;
  const result = transformSync(code, {
    ast: false,
    babelrc: false,
    configFile: false,
    sourceMaps: true,
    parserOpts: { sourceType: "unambiguous", plugins: ["jsx", "typescript"] },
    plugins: [
      ({ types, template }) => ({
        visitor: {
          CallExpression(callPath) {
            const callee = callPath.node.callee;
            if (callee.type !== "Identifier") return;
            const binding = callPath.scope.getBinding(callee.name);
            if (
              !binding ||
              binding.path.type !== "ImportSpecifier" ||
              binding.path.parent.source.value !== apiSpecifier ||
              binding.path.node.imported.name !== "tw"
            ) {
              return;
            }

            const args = callPath.node.arguments;
            if (args.some((arg) => arg.type === "SpreadElement")) {
              throw callPath.buildCodeFrameError("Spread arguments are not supported by the Vite static tw() compiler.");
            }

            let replacement;
            if (args.length === 1 && args[0].type === "StringLiteral") {
              replacement = types.stringLiteral(styleApi(args[0].value));
            } else if (
              args.length === 2 &&
              args[0].type === "StringLiteral" &&
              args[1].type === "StringLiteral"
            ) {
              replacement = types.stringLiteral(styleApi(args[0].value, args[1].value));
            } else if (args.length === 1 && args[0].type === "ObjectExpression") {
              if (callPath.parentPath.type !== "VariableDeclarator") {
                throw callPath.buildCodeFrameError(
                  "tw() variant/slot configs must be assigned to a variable for static compilation."
                );
              }
              const config = readStaticValue(args[0]);
              replacement = template.expression(createStaticResolver(styleApi, config), {
                placeholderPattern: false,
              })();
            } else {
              throw callPath.buildCodeFrameError(
                "This tw() call is not statically analyzable. Use literal arguments or a static object config."
              );
            }

            callPath.replaceWith(replacement);
            changed = true;
          },
          Program: {
            exit(programPath) {
              programPath.scope.crawl();
              for (const statement of programPath.get("body")) {
                if (!statement.isImportDeclaration() || statement.node.source.value !== apiSpecifier) continue;
                for (const specifier of statement.get("specifiers")) {
                  if (!specifier.isImportSpecifier() || specifier.node.imported.name !== "tw") continue;
                  const binding = programPath.scope.getBinding(specifier.node.local.name);
                  if (!binding || binding.referencePaths.length === 0) {
                    specifier.remove();
                    changed = true;
                  }
                  else {
                    throw specifier.buildCodeFrameError(
                      "Every imported tw() use must be a direct statically analyzable call for production compilation."
                    );
                  }
                }
                const cxSpecifier = statement.node.specifiers.find(
                  (specifier) => specifier.type === "ImportSpecifier" && specifier.imported.name === "cx"
                );
                if (cxSpecifier && apiSpecifier === "tailwind-to-style") {
                  statement.insertBefore(
                    types.importDeclaration(
                      [types.importSpecifier(types.cloneNode(cxSpecifier.local), types.identifier("cx"))],
                      types.stringLiteral(`${apiSpecifier}/cx`)
                    )
                  );
                  statement.node.specifiers = statement.node.specifiers.filter(
                    (specifier) => specifier !== cxSpecifier
                  );
                }
                if (statement.node.specifiers.length === 0) statement.remove();
                }
            },
          },
        },
      }),
    ],
  });
  return result && changed ? { code: result.code, map: result.map } : null;
}

function toViteModuleId(root, file) {
  return `/${path.relative(root, file).split(path.sep).join("/")}`;
}

function normalizeModuleId(id) {
  let normalized = id.split(/[?#]/, 1)[0].replace(/\\/g, "/");
  if (normalized.startsWith("/@fs/")) normalized = normalized.slice(5);
  normalized = normalized.replace(/^\/([a-z]:\/)/i, "$1");
  return path.resolve(normalized).replace(/\\/g, "/").toLowerCase();
}

function normalizeAssetPath(root, outDir, outFile) {
  const resolvedOutput = path.resolve(root, outDir);
  const resolvedFile = path.resolve(root, outFile);
  const assetPath = path.relative(resolvedOutput, resolvedFile);

  if (assetPath.startsWith("..") || path.isAbsolute(assetPath)) {
    throw new Error(
      `tailwind-to-style/vite: outFile "${outFile}" must be inside Vite's output directory "${outDir}".`
    );
  }

  return assetPath.split(path.sep).join("/");
}

async function loadVite(root) {
  try {
    return await import("vite");
  } catch (importError) {
    try {
      const requireFromProject = createRequire(path.resolve(root, "package.json"));
      return await import(pathToFileURL(requireFromProject.resolve("vite")).href);
    } catch (resolveError) {
      throw new Error(
        "tailwind-to-style/vite: Vite could not be loaded. Ensure Vite is installed in the consuming project.",
        { cause: resolveError || importError }
      );
    }
  }
}

/**
 * Collect generated tw() CSS by evaluating and server-rendering an application
 * entry, then emit that CSS as a production stylesheet.
 */
export function twsxVitePlugin(options = {}) {
  const {
    entry = "src/App.jsx",
    api = "tailwind-to-style",
    apiName = "tw",
    exportName = "App",
    outFile = "dist/twsx.css",
    minify = false,
  } = options;

  let root = process.cwd();
  let base = "/";
  let outDir = "dist";
  let resolveAliases = [];
  let assetFileName;
  let apiModuleId;
  let ssrServer;
  let css = "";
  let styleApi;
  let isBuild = false;

  async function closeSsrServer() {
    if (ssrServer) {
      await ssrServer.close();
      ssrServer = null;
    }
  }

  async function collectCSS() {
    const { createServer } = await loadVite(root);
    ssrServer = await createServer({
      configFile: false,
      root,
      resolve: { alias: resolveAliases },
      server: { middlewareMode: true, hmr: false },
      appType: "custom",
      logLevel: "error",
      optimizeDeps: { noDiscovery: true, include: [] },
    });

    try {
      const entryPath = path.resolve(root, entry);
      const entryId = toViteModuleId(root, entryPath);
      const apiResolved = await ssrServer.pluginContainer.resolveId(api, entryId);

      if (!apiResolved) {
        throw new Error(
          `tailwind-to-style/vite: Could not resolve the API module "${api}" from "${entry}".`
        );
      }

      apiModuleId = normalizeModuleId(apiResolved.id);
      const apiModule = await ssrServer.ssrLoadModule(api);
      styleApi = apiModule[apiName];

      if (
        !styleApi ||
        typeof styleApi.extractCSS !== "function" ||
        typeof styleApi.runtime !== "function"
      ) {
        throw new TypeError(
          `tailwind-to-style/vite: API module "${api}" must export "${apiName}" with extractCSS() and runtime().`
        );
      }

      if (typeof styleApi.clearCache === "function") {
        styleApi.clearCache();
      }
      styleApi.runtime({ inject: true });

      const appModule = await ssrServer.ssrLoadModule(entryId);
      const App = exportName ? appModule[exportName] : null;

      if (exportName && typeof App !== "function") {
        throw new TypeError(
          `tailwind-to-style/vite: Entry "${entry}" must export a React component named "${exportName}".`
        );
      }

      if (App) {
        const requireFromProject = createRequire(path.resolve(root, "package.json"));
        const React = requireFromProject("react");
        const ReactDOMServer = requireFromProject("react-dom/server");
        ReactDOMServer.renderToString(React.createElement(App));
      }

    } catch (error) {
      await closeSsrServer();
      throw error;
    }
  }

  return {
    name: "tailwind-to-style:build",
    enforce: "pre",

    configResolved(config) {
      root = config.root;
      base = config.base;
      outDir = config.build.outDir;
      isBuild = config.command === "build";
      assetFileName = normalizeAssetPath(root, outDir, outFile);
      resolveAliases = config.resolve.alias;
    },

    async buildStart() {
      if (!isBuild) return;
      await collectCSS();
    },

    transform(code, id) {
      if (!isBuild) return null;
      if (apiName === "tw" && code.includes(api) && code.includes("tw")) {
        try {
          const compiled = compileTwCalls(code, api, styleApi);
          if (compiled) return compiled;
        } catch (error) {
          const message = `tailwind-to-style/vite: ${error.message}`;
          if (typeof this.error === "function") this.error(message);
          throw new Error(message, { cause: error });
        }
      }
      if (normalizeModuleId(id) !== apiModuleId) return null;

      return {
        code: `${code}\nif (import.meta.env.PROD) ${apiName}.runtime({ inject: false });`,
        map: null,
      };
    },

    transformIndexHtml: {
      order: "post",
      handler(html) {
        if (!isBuild) return html;
        const basePath = base.endsWith("/") ? base : `${base}/`;
        const stylesheetHref = `${basePath}${assetFileName}`;
        return html.replace(
          "</head>",
          `  <link rel="stylesheet" href="${stylesheetHref}" />\n  </head>`
        );
      },
    },

    generateBundle() {
      css = styleApi.extractCSS({ minify });
      if (!css.trim()) {
        throw new Error(
          `tailwind-to-style/vite: No CSS was collected from "${entry}". Ensure the entry imports styles through "${api}".`
        );
      }
      this.emitFile({
        type: "asset",
        fileName: assetFileName,
        source: css,
      });
    },

    async closeBundle() {
      await closeSsrServer();
    },

    async buildEnd(error) {
      if (error) await closeSsrServer();
    },
  };
}

export default twsxVitePlugin;
