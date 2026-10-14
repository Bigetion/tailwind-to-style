import type { Plugin } from 'vite';

export interface TwsxVitePluginOptions {
  /** React component source used to collect styles and compile static tw() calls. */
  entry?: string;
  /** Module specifier that exports the unified `tw` API. */
  api?: string;
  /** API export to extract; use `twsx` for CSS extraction without the tw() compiler. */
  apiName?: 'tw' | 'twsx';
  /** Named React component export from `entry`; set null to skip server rendering. */
  exportName?: string | null;
  /** CSS output path, relative to the project root and inside Vite's outDir. */
  outFile?: string;
  /** Minify the extracted CSS. */
  minify?: boolean;
}

export function twsxVitePlugin(options?: TwsxVitePluginOptions): Plugin;
export default twsxVitePlugin;
