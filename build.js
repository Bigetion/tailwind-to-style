const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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

// Simple build process - copy src to output
console.log('Building main file...');
let mainContent = fs.readFileSync(mainFile, 'utf-8');
fs.writeFileSync(outputMainFile, mainContent);
console.log('Main file built successfully!');

// Create minified version with terser
console.log('Building minified version...');
try {
  // Install terser if not present
  execSync('npx terser --version', { stdio: 'ignore' });
} catch (error) {
  console.log('Installing terser...');
  execSync('npm install -g terser');
}

// Minify and write to file
try {
  execSync(`npx terser ${outputMainFile} -o ${outputMinFile} --compress --mangle`);
  console.log('Minified version built successfully!');
} catch (error) {
  console.error('Error creating minified version:', error.message);
}

// Create ESM version for bundlers
console.log('Building ESM module...');
fs.writeFileSync(outputEsmFile, mainContent);
console.log('ESM module built successfully!');

// Copy other necessary files
const typeDefsSource = path.join(__dirname, 'types', 'index.d.ts');
const typeDefsDest = path.join(distDir, 'index.d.ts');
if (fs.existsSync(typeDefsSource)) {
  fs.copyFileSync(typeDefsSource, typeDefsDest);
  console.log('TypeScript definitions copied successfully!');
}

console.log('Build completed successfully!');
