import fs from 'node:fs/promises';
import path from 'node:path';
import { twsxVitePlugin } from '../src/vite/index.js';

describe('twsx Vite build plugin', () => {
  test.each([
    {
      apiName: 'tw',
      source: [
        "import { cx, tw } from 'tailwind-to-style';",
        "const shell = tw('feature-shell', 'rounded-lg bg-slate-200 p-4');",
        "const utilities = tw('inline-flex items-center');",
        "const button = tw({ name: 'button', hash: false, variants: { tone: { primary: 'bg-blue-600', quiet: 'bg-slate-100' } }, defaultVariants: { tone: 'primary' } });",
        "const buttonClass = tone => button({ tone });",
        "const combined = cx(shell, utilities);",
      ],
      expectedSelector: '.feature-shell-',
    },
    {
      apiName: 'twsx',
      source: [
        "import { twsx } from 'tailwind-to-style-core';",
        "const shell = twsx({ '.feature-shell': 'rounded-lg bg-slate-200 p-4' });",
      ],
      expectedSelector: '.feature-shell',
    },
  ])('collects $apiName styles, links emitted CSS, and disables runtime injection', async ({
    apiName,
    source,
    expectedSelector,
  }) => {
    const projectRoot = path.resolve('examples/twsx-stackblitz-starter');
    const tempDir = await fs.mkdtemp(path.join(projectRoot, '.tmp-twsx-vite-plugin-'));
    const apiPath = path.resolve(apiName === 'tw' ? 'src/v4/index.js' : 'src/index.js');
    const entryDirectory = path.join(tempDir, 'src');
    await fs.mkdir(entryDirectory, { recursive: true });
    await fs.writeFile(
      path.join(entryDirectory, 'App.jsx'),
      [...source, 'export function App() { return null; }'].join('\n')
    );

    const plugin = twsxVitePlugin({
      entry: 'src/App.jsx',
      api: apiName === 'tw' ? 'tailwind-to-style' : 'tailwind-to-style-core',
      apiName,
      exportName: null,
      outFile: 'dist/assets/twsx.css',
      minify: true,
    });

    try {
      plugin.configResolved({
        root: tempDir,
        base: '/',
        command: 'build',
        build: { outDir: 'dist' },
        resolve: {
          alias: [
            { find: 'tailwind-to-style', replacement: path.resolve('src/v4/index.js') },
            { find: 'tailwind-to-style-core', replacement: path.resolve('src/index.js') },
          ],
        },
      });

      await plugin.buildStart();

      const assets = [];
      plugin.generateBundle.call({
        emitFile: (asset) => assets.push(asset),
      });

      expect(assets).toHaveLength(1);
      expect(assets[0].fileName).toBe('assets/twsx.css');
      expect(assets[0].source).toContain(expectedSelector);
      expect(assets[0].source).toContain('background-color');
      if (apiName === 'tw') {
        expect(assets[0].source).toContain('.tw-inline-flex');
      }
      expect(plugin.transformIndexHtml.handler('<html><head></head></html>')).toContain(
        'href="/assets/twsx.css"'
      );

      const runtimeTransform = plugin.transform(
        'export { tw };',
        apiPath
      );
      if (apiName === 'tw') {
        const compiled = plugin.transform(source.join('\n'), path.join(entryDirectory, 'App.jsx'));
        expect(compiled.code).not.toContain("from 'tailwind-to-style'");
        expect(compiled.code).toContain('from "tailwind-to-style/cx"');
        expect(compiled.code).toContain('button--tone-primary');
        expect(compiled.code).not.toContain('bg-blue-600');
        expect(compiled.code).not.toContain('import { tw }');
        expect(runtimeTransform.code).toContain('tw.runtime({ inject: false })');
        expect(() =>
          plugin.transform(
            "import { tw } from 'tailwind-to-style'; const result = tw(dynamicClasses);",
            path.join(entryDirectory, 'Dynamic.jsx')
          )
        ).toThrow('not statically analyzable');
        expect(() =>
          plugin.transform(
            "import { tw } from 'tailwind-to-style'; const makeClass = tw;",
            path.join(entryDirectory, 'Alias.jsx')
          )
        ).toThrow('Every imported tw() use must be a direct statically analyzable call');
      } else {
        expect(runtimeTransform.code).toContain('twsx.runtime({ inject: false })');
      }
    } finally {
      await plugin.closeBundle();
      await fs.rm(tempDir, { recursive: true, force: true });
    }
  });

  test('rejects stylesheet output outside of the Vite output directory', () => {
    const plugin = twsxVitePlugin({ outFile: '../outside.css' });

    expect(() =>
      plugin.configResolved({
        root: path.resolve('tests'),
        base: '/',
        command: 'build',
        build: { outDir: 'dist' },
        resolve: { alias: [] },
      })
    ).toThrow('must be inside Vite\'s output directory');
  });
});
