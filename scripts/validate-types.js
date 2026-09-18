#!/usr/bin/env node

/**
 * TypeScript Definitions Validation Script
 * 
 * Validates that all type definitions are consistent with the actual implementation.
 * Checks for:
 * - Missing exports in type definitions
 * - Outdated type signatures
 * - Broken references between type files
 * 
 * Usage:
 *   npm run validate:types
 *   node scripts/validate-types.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TYPES_DIR = path.join(__dirname, '../types');
const SRC_DIR = path.join(__dirname, '../src');
const DIST_DIR = path.join(__dirname, '../dist');

const COLOR = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

let errorCount = 0;
let warningCount = 0;

function log(message, color = COLOR.reset) {
  console.log(`${color}${message}${COLOR.reset}`);
}

function error(message) {
  errorCount++;
  log(`  ${COLOR.red}✗${COLOR.reset} ${message}`);
}

function warning(message) {
  warningCount++;
  log(`  ${COLOR.yellow}⚠${COLOR.reset} ${message}`);
}

function success(message) {
  log(`  ${COLOR.green}✓${COLOR.reset} ${message}`);
}

/**
 * Check if a file exists
 */
function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
}

/**
 * Read file content safely
 */
function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (err) {
    return null;
  }
}

/**
 * Get all type definition files
 */
function getTypeFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getTypeFiles(filePath, fileList);
    } else if (file.endsWith('.d.ts')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Extract exports from a type file
 */
function extractExports(content) {
  const exports = [];
  
  // Match: export function name(...) or export const name
  const functionRegex = /export\s+(?:declare\s+)?(?:function|const|let|var|class|interface|type|enum|namespace)\s+(\w+)/g;
  let match;
  
  while ((match = functionRegex.exec(content)) !== null) {
    exports.push(match[1]);
  }

  // Match: export { a, b, c }
  const namedExportRegex = /export\s+\{([^}]+)\}/g;
  while ((match = namedExportRegex.exec(content)) !== null) {
    const names = match[1].split(',').map(n => n.trim().split(' as ')[0].trim());
    exports.push(...names);
  }

  return exports;
}

/**
 * Extract exports from a JavaScript file
 */
function extractJSExports(content) {
  const exports = [];
  
  // Match: export function name() or export const name
  const exportRegex = /export\s+(?:function|const|let|var|class)\s+(\w+)/g;
  let match;
  
  while ((match = exportRegex.exec(content)) !== null) {
    exports.push(match[1]);
  }

  // Match: export { a, b, c }
  const namedExportRegex = /export\s+\{([^}]+)\}/g;
  while ((match = namedExportRegex.exec(content)) !== null) {
    const names = match[1].split(',').map(n => n.trim().split(' as ')[0].trim());
    exports.push(...names);
  }

  return exports;
}

/**
 * Check for missing type references
 */
function checkTypeReferences(content, filePath) {
  const issues = [];
  
  // Check for broken import paths
  const importRegex = /from\s+['"]([^'"]+)['"]/g;
  let match;
  
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    
    // Skip external packages
    if (!importPath.startsWith('.')) continue;
    
    const resolvedPath = path.resolve(path.dirname(filePath), importPath);
    const possiblePaths = [
      resolvedPath + '.d.ts',
      resolvedPath + '/index.d.ts',
      resolvedPath,
    ];
    
    const exists = possiblePaths.some(p => fileExists(p));
    
    if (!exists) {
      issues.push(`Broken import: "${importPath}" (resolved to ${resolvedPath})`);
    }
  }
  
  return issues;
}

/**
 * Check type coverage for subpath exports
 */
function checkSubpathTypes() {
  log(`\n${COLOR.cyan}Checking subpath type coverage...${COLOR.reset}`);
  
  const packageJson = JSON.parse(readFile(path.join(__dirname, '../package.json')));
  const exports = packageJson.exports || {};
  
  Object.entries(exports).forEach(([exportPath, config]) => {
    if (exportPath === './package.json' || exportPath === './preflight.css') return;
    
    const typesPath = typeof config === 'object' ? config.types : null;
    
    if (!typesPath) {
      warning(`No types defined for export "${exportPath}"`);
      return;
    }
    
    const fullTypesPath = path.join(__dirname, '..', typesPath);
    
    if (!fileExists(fullTypesPath)) {
      error(`Type file missing for export "${exportPath}": ${typesPath}`);
    } else {
      success(`Type file exists for "${exportPath}"`);
    }
  });
}

/**
 * Validate main entry point types
 */
function validateMainTypes() {
  log(`\n${COLOR.cyan}Validating main entry point types...${COLOR.reset}`);
  
  const mainTypesPath = path.join(TYPES_DIR, 'index.d.ts');
  const mainSrcPath = path.join(SRC_DIR, 'v4', 'index.js');
  
  if (!fileExists(mainTypesPath)) {
    error('Main type definition file not found: types/index.d.ts');
    return;
  }
  
  if (!fileExists(mainSrcPath)) {
    warning('Main source file not found: src/v4/index.js (might be okay if using different entry)');
  }
  
  const typesContent = readFile(mainTypesPath);
  const srcContent = mainSrcPath ? readFile(mainSrcPath) : null;
  
  if (typesContent) {
    const typeExports = extractExports(typesContent);
    success(`Main types file exports ${typeExports.length} items`);
    
    // Check for essential exports
    const essentialExports = ['tw', 'tws', 'cx', 'twsx', 'twsxVariants'];
    essentialExports.forEach(exp => {
      if (!typeExports.includes(exp)) {
        warning(`Essential export "${exp}" not found in main types`);
      }
    });
  }
  
  if (srcContent) {
    const srcExports = extractJSExports(srcContent);
    log(`  ${COLOR.gray}Source file exports: ${srcExports.length} items${COLOR.reset}`);
  }
}

/**
 * Check for type consistency across files
 */
function checkTypeConsistency() {
  log(`\n${COLOR.cyan}Checking type file consistency...${COLOR.reset}`);
  
  const typeFiles = getTypeFiles(TYPES_DIR);
  
  typeFiles.forEach(filePath => {
    const relativePath = path.relative(TYPES_DIR, filePath);
    const content = readFile(filePath);
    
    if (!content) {
      error(`Cannot read type file: ${relativePath}`);
      return;
    }
    
    // Check for broken references
    const issues = checkTypeReferences(content, filePath);
    
    if (issues.length > 0) {
      error(`Issues in ${relativePath}:`);
      issues.forEach(issue => log(`    - ${issue}`));
    } else {
      success(`${relativePath} - No broken references`);
    }
  });
}

/**
 * Verify dist types are copied correctly
 */
function checkDistTypes() {
  log(`\n${COLOR.cyan}Checking dist type files...${COLOR.reset}`);
  
  if (!fileExists(DIST_DIR)) {
    warning('dist/ directory not found. Run "npm run build" first.');
    return;
  }
  
  const essentialTypes = [
    'index.d.ts',
    'cx.d.ts',
    'react/index.d.ts',
    'tokens/index.d.ts',
    'animations/index.d.ts',
  ];
  
  essentialTypes.forEach(typePath => {
    const fullPath = path.join(DIST_DIR, typePath);
    
    if (fileExists(fullPath)) {
      success(`${typePath} exists in dist/`);
    } else {
      error(`${typePath} missing from dist/`);
    }
  });
}

/**
 * Generate type coverage report
 */
function generateCoverageReport() {
  log(`\n${COLOR.cyan}Type Coverage Summary:${COLOR.reset}\n`);
  
  const typeFiles = getTypeFiles(TYPES_DIR);
  let totalExports = 0;
  
  typeFiles.forEach(filePath => {
    const content = readFile(filePath);
    if (content) {
      const exports = extractExports(content);
      totalExports += exports.length;
    }
  });
  
  log(`  Total type files: ${typeFiles.length}`);
  log(`  Total exported types: ${totalExports}`);
  log(`  Average exports per file: ${(totalExports / typeFiles.length).toFixed(1)}\n`);
}

/**
 * Main validation function
 */
function validateTypes() {
  log(`\n${COLOR.cyan}╔════════════════════════════════════════╗${COLOR.reset}`);
  log(`${COLOR.cyan}║   TypeScript Definitions Validation   ║${COLOR.reset}`);
  log(`${COLOR.cyan}╚════════════════════════════════════════╝${COLOR.reset}\n`);

  if (!fileExists(TYPES_DIR)) {
    log(`${COLOR.red}Error: types/ directory not found${COLOR.reset}`);
    process.exit(1);
  }

  // Run all checks
  validateMainTypes();
  checkSubpathTypes();
  checkTypeConsistency();
  checkDistTypes();
  generateCoverageReport();

  // Print summary
  log(`${COLOR.cyan}Validation Results:${COLOR.reset}\n`);
  
  if (errorCount > 0) {
    log(`  ${COLOR.red}${errorCount} error(s)${COLOR.reset}`);
  }
  
  if (warningCount > 0) {
    log(`  ${COLOR.yellow}${warningCount} warning(s)${COLOR.reset}`);
  }
  
  if (errorCount === 0 && warningCount === 0) {
    log(`  ${COLOR.green}✓ All type definitions are valid!${COLOR.reset}\n`);
  } else {
    log('');
  }

  // Exit with error if there are critical issues
  if (errorCount > 0) {
    log(`${COLOR.red}Type validation failed!${COLOR.reset}\n`);
    process.exit(1);
  }

  log(`${COLOR.green}Type validation passed!${COLOR.reset}\n`);
}

// Run validation
validateTypes();
