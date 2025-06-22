const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const babel = require('@babel/core');

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
console.log('Bundling with webpack...');
try {
  // Install webpack if not present
  try {
    execSync('npx webpack --version', { stdio: 'ignore' });
  } catch (error) {
    console.log('Installing webpack...');
    execSync('npm install --save-dev webpack webpack-cli');
  }

  // Create a temporary webpack config
  const webpackConfig = `
    const path = require('path');
    
    module.exports = [
      {
        // UMD build
        entry: './src/index.js',
        output: {
          path: path.resolve(__dirname, '.'),
          filename: 'index.js',
          library: 'tailwindToStyle',
          libraryTarget: 'umd',
          globalObject: 'this'
        },
        mode: 'development',
        module: {
          rules: [
            {
              test: /\\.js$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env']
                }
              }
            }
          ]
        }
      },
      {
        // ESM build
        entry: './src/index.js',
        output: {
          path: path.resolve(__dirname, 'dist'),
          filename: 'index.esm.js',
          library: {
            type: 'module'
          }
        },
        mode: 'development',
        experiments: {
          outputModule: true
        },
        module: {
          rules: [
            {
              test: /\\.js$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env']
                }
              }
            }
          ]
        }
      }
    ];
  `;

  // Write temporary webpack config
  fs.writeFileSync('webpack.config.temp.js', webpackConfig);

  // Run webpack
  execSync('npx webpack --config webpack.config.temp.js', { stdio: 'inherit' });

  // Create minified version with terser
  console.log('Building minified version...');
  try {
    execSync('npx terser index.js -o index.min.js --compress --mangle');
    console.log('Minified version built successfully!');
  } catch (error) {
    console.error('Error creating minified version:', error.message);
  }

  // Clean up temporary config
  fs.unlinkSync('webpack.config.temp.js');
  
  // Copy TypeScript definitions
  const typeDefsSource = path.join(__dirname, 'types', 'index.d.ts');
  const typeDefsDest = path.join(distDir, 'index.d.ts');
  if (fs.existsSync(typeDefsSource)) {
    fs.copyFileSync(typeDefsSource, typeDefsDest);
    console.log('TypeScript definitions copied successfully!');
  }

  console.log('Build completed successfully!');
} catch (error) {
  console.error('Error during build:', error.message);
  process.exit(1);
}
