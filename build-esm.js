import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import babel from '@babel/core';

// Get directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Source directory
const srcDir = path.join(__dirname, 'src');
const mainFile = path.join(srcDir, 'index.js');
const distDir = path.join(__dirname, 'dist');
const outputMainFile = path.join(__dirname, 'index.js');
const outputMinFile = path.join(__dirname, 'index.min.js');
const outputEsmFile = path.join(distDir, 'index.esm.js');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Bundling with webpack
console.log('Bundling for ES modules...');
try {
  // For ESM output
  console.log('Creating ESM bundle...');
  fs.copyFileSync(mainFile, outputEsmFile);
  console.log(`Created ESM bundle: ${outputEsmFile}`);

  // Transpile for CJS output
  console.log('Creating CommonJS bundle...');
  const result = babel.transformFileSync(mainFile, {
    presets: [
      ['@babel/preset-env', {
        modules: 'commonjs',
        targets: {
          node: '10',
          browsers: '> 0.25%, not dead'
        }
      }]
    ]
  });
  fs.writeFileSync(outputMainFile, result.code);
  console.log(`Created CommonJS bundle: ${outputMainFile}`);

  // Create minified version
  console.log('Creating minified version...');
  execSync(`npx terser ${outputMainFile} -o ${outputMinFile} --compress --mangle`);
  console.log(`Created minified bundle: ${outputMinFile}`);

  // Generate TypeScript definitions
  console.log('Generating TypeScript definitions...');
  fs.writeFileSync(
    path.join(distDir, 'index.d.ts'),
    `export declare function tws(classNames: string, format?: number): any;
export declare function twsx(config: object): string;
`
  );
  console.log('Created TypeScript definitions');

  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
