const fs = require("fs");
const path = require("path");
const { twsx } = require("tailwind-to-style");

function buildTwsx(twsxDir, outDir) {
  let allCss = '';
  fs.readdirSync(twsxDir).forEach((file) => {
    if (file.endsWith('.json')) {
      const json = JSON.parse(fs.readFileSync(path.join(twsxDir, file), 'utf8'));
      const css = twsx(json, { inject: false });
      const outFile = path.join(outDir, file.replace('.json', '.css'));
      fs.writeFileSync(outFile, css);
      allCss += css + '\n';
    }
  });
  return allCss;
}

module.exports = function twsxPlugin(options = {}) {
  const twsxDir = options.twsxDir || path.resolve(process.cwd(), 'src/twsx');
  const outDir = options.outDir || path.resolve(process.cwd(), 'dist');
  const cssFile = path.resolve(process.cwd(), 'node_modules/tailwind-to-style/twsx.css');

  return {
    name: 'vite-twsx',
    buildStart() {
      const allCss = buildTwsx(twsxDir, outDir);
      fs.writeFileSync(cssFile, allCss);
    },
    handleHotUpdate() {
      const allCss = buildTwsx(twsxDir, outDir);
      fs.writeFileSync(cssFile, allCss);
    },
  };
};
