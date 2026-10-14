import fs from 'node:fs/promises';
import path from 'node:path';
import { twsx } from '../index.js';

export function createBuildCollector(options = {}) {
  const {
    minify = false,
    inject = false,
  } = options;

  const collector = {
    minify,
    inject,
    css: '',
    extract() {
      const css = twsx.extractCSS({ minify });
      this.css = css;
      return css;
    },
    async write(outFile) {
      const css = this.extract();
      const resolved = path.resolve(process.cwd(), outFile || options.outFile || 'dist/twsx.css');
      await fs.mkdir(path.dirname(resolved), { recursive: true });
      await fs.writeFile(resolved, css, 'utf8');
      return css;
    },
  };

  return collector;
}

export async function buildTwsx(options = {}) {
  const {
    outFile = 'dist/twsx.css',
    minify = false,
    inject = false,
  } = options;

  twsx.runtime({ inject: Boolean(inject) });
  const css = twsx.extractCSS({ minify });

  if (outFile) {
    const resolved = path.resolve(process.cwd(), outFile);
    await fs.mkdir(path.dirname(resolved), { recursive: true });
    await fs.writeFile(resolved, css, 'utf8');
  }

  return css;
}

export default buildTwsx;
