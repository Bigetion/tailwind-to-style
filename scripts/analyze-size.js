#!/usr/bin/env node

/**
 * Bundle Size Analysis Script
 * 
 * Analyzes the built distribution files and outputs detailed size metrics.
 * Used for CI monitoring and development insights.
 * 
 * Usage:
 *   npm run size
 *   node scripts/analyze-size.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import zlib from 'zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, '../dist');
const SIZE_LIMITS = {
  'index.esm.js': 400 * 1024,     // 400 KB (reasonable for full Tailwind runtime)
  'index.cjs': 400 * 1024,         // 400 KB
  'index.min.js': 180 * 1024,      // 180 KB minified
  'cx.esm.js': 5 * 1024,           // 5 KB max
  'tokens/index.esm.js': 15 * 1024, // 15 KB target
};

const COLOR = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

/**
 * Format bytes to human-readable string
 */
function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Get gzipped size of a file
 */
function getGzipSize(filePath) {
  const content = fs.readFileSync(filePath);
  const gzipped = zlib.gzipSync(content, { level: 9 });
  return gzipped.length;
}

/**
 * Get brotli compressed size of a file
 */
function getBrotliSize(filePath) {
  try {
    const content = fs.readFileSync(filePath);
    const compressed = zlib.brotliCompressSync(content, {
      params: {
        [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
      },
    });
    return compressed.length;
  } catch (err) {
    return null;
  }
}

/**
 * Recursively get all JS files in a directory
 */
function getAllJsFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllJsFiles(filePath, fileList);
    } else if (
      file.endsWith('.js') &&
      !file.endsWith('.map') &&
      !file.includes('.min.')
    ) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Check if size exceeds limit
 */
function checkSizeLimit(relativePath, size) {
  const limit = SIZE_LIMITS[relativePath];
  if (!limit) return null;

  const percentage = (size / limit) * 100;
  const diff = size - limit;

  return {
    limit,
    percentage,
    diff,
    exceeds: size > limit,
  };
}

/**
 * Main analysis function
 */
function analyzeBundle() {
  console.log(`\n${COLOR.cyan}╔════════════════════════════════════════╗${COLOR.reset}`);
  console.log(`${COLOR.cyan}║   Bundle Size Analysis Report         ║${COLOR.reset}`);
  console.log(`${COLOR.cyan}╚════════════════════════════════════════╝${COLOR.reset}\n`);

  if (!fs.existsSync(DIST_DIR)) {
    console.error(`${COLOR.red}Error: dist/ directory not found. Run 'npm run build' first.${COLOR.reset}`);
    process.exit(1);
  }

  const files = getAllJsFiles(DIST_DIR);
  const results = [];
  let totalRaw = 0;
  let totalGzip = 0;
  let totalBrotli = 0;
  let hasExceededLimit = false;

  // Analyze each file
  files.forEach((filePath) => {
    const relativePath = path.relative(DIST_DIR, filePath);
    const stat = fs.statSync(filePath);
    const rawSize = stat.size;
    const gzipSize = getGzipSize(filePath);
    const brotliSize = getBrotliSize(filePath);

    totalRaw += rawSize;
    totalGzip += gzipSize;
    if (brotliSize) totalBrotli += brotliSize;

    const limitCheck = checkSizeLimit(relativePath, rawSize);

    results.push({
      path: relativePath,
      rawSize,
      gzipSize,
      brotliSize,
      limitCheck,
    });
  });

  // Sort by raw size (descending)
  results.sort((a, b) => b.rawSize - a.rawSize);

  // Print table header
  console.log(`${COLOR.gray}┌─────────────────────────────────────┬──────────┬──────────┬──────────┬─────────┐${COLOR.reset}`);
  console.log(`${COLOR.gray}│${COLOR.reset} File                                ${COLOR.gray}│${COLOR.reset} Raw      ${COLOR.gray}│${COLOR.reset} Gzip     ${COLOR.gray}│${COLOR.reset} Brotli   ${COLOR.gray}│${COLOR.reset} Status  ${COLOR.gray}│${COLOR.reset}`);
  console.log(`${COLOR.gray}├─────────────────────────────────────┼──────────┼──────────┼──────────┼─────────┤${COLOR.reset}`);

  // Print each file
  results.forEach(({ path: filePath, rawSize, gzipSize, brotliSize, limitCheck }) => {
    const pathDisplay = filePath.padEnd(35).substring(0, 35);
    const rawDisplay = formatBytes(rawSize).padStart(8);
    const gzipDisplay = formatBytes(gzipSize).padStart(8);
    const brotliDisplay = brotliSize ? formatBytes(brotliSize).padStart(8) : '   -    ';

    let status = '   -   ';
    let statusColor = COLOR.reset;

    if (limitCheck) {
      if (limitCheck.exceeds) {
        status = ` ${COLOR.red}⚠ OVER${COLOR.reset} `;
        statusColor = COLOR.red;
        hasExceededLimit = true;
      } else if (limitCheck.percentage > 90) {
        status = ` ${COLOR.yellow}⚠ WARN${COLOR.reset} `;
        statusColor = COLOR.yellow;
      } else {
        status = ` ${COLOR.green}✓ OK  ${COLOR.reset} `;
        statusColor = COLOR.green;
      }
    }

    console.log(`${COLOR.gray}│${COLOR.reset} ${pathDisplay} ${COLOR.gray}│${COLOR.reset} ${rawDisplay} ${COLOR.gray}│${COLOR.reset} ${gzipDisplay} ${COLOR.gray}│${COLOR.reset} ${brotliDisplay} ${COLOR.gray}│${COLOR.reset}${status}${COLOR.gray}│${COLOR.reset}`);
  });

  console.log(`${COLOR.gray}└─────────────────────────────────────┴──────────┴──────────┴──────────┴─────────┘${COLOR.reset}\n`);

  // Print totals
  console.log(`${COLOR.cyan}Total Bundle Sizes:${COLOR.reset}`);
  console.log(`  Raw:    ${COLOR.blue}${formatBytes(totalRaw)}${COLOR.reset}`);
  console.log(`  Gzip:   ${COLOR.blue}${formatBytes(totalGzip)}${COLOR.reset} ${COLOR.gray}(typical CDN compression)${COLOR.reset}`);
  console.log(`  Brotli: ${COLOR.blue}${formatBytes(totalBrotli)}${COLOR.reset} ${COLOR.gray}(modern compression)${COLOR.reset}\n`);

  // Print limit warnings
  const filesWithLimits = results.filter((r) => r.limitCheck);
  if (filesWithLimits.length > 0) {
    console.log(`${COLOR.cyan}Size Limit Checks:${COLOR.reset}\n`);

    filesWithLimits.forEach(({ path: filePath, rawSize, limitCheck }) => {
      const { limit, percentage, diff, exceeds } = limitCheck;
      const statusColor = exceeds ? COLOR.red : percentage > 90 ? COLOR.yellow : COLOR.green;
      const icon = exceeds ? '✗' : percentage > 90 ? '⚠' : '✓';

      console.log(`  ${statusColor}${icon}${COLOR.reset} ${filePath}`);
      console.log(`    Current: ${formatBytes(rawSize)} | Limit: ${formatBytes(limit)} | ${percentage.toFixed(1)}%`);

      if (exceeds) {
        console.log(`    ${COLOR.red}Exceeds limit by ${formatBytes(diff)}${COLOR.reset}`);
      } else if (percentage > 90) {
        console.log(`    ${COLOR.yellow}Approaching limit (${formatBytes(limit - rawSize)} remaining)${COLOR.reset}`);
      }

      console.log();
    });
  }

  // Print recommendations
  console.log(`${COLOR.cyan}Recommendations:${COLOR.reset}\n`);

  if (hasExceededLimit) {
    console.log(`  ${COLOR.red}⚠ Some bundles exceed size limits!${COLOR.reset}`);
    console.log(`  ${COLOR.gray}→ Consider code-splitting or lazy loading${COLOR.reset}`);
    console.log(`  ${COLOR.gray}→ Review bundle composition with: npm run analyze${COLOR.reset}\n`);
  } else {
    console.log(`  ${COLOR.green}✓ All monitored bundles are within size limits${COLOR.reset}\n`);
  }

  // Key files summary
  const mainBundle = results.find((r) => r.path === 'index.esm.js');
  const minBundle = results.find((r) => r.path === 'index.min.js');

  if (mainBundle) {
    console.log(`${COLOR.cyan}Main Bundle (ESM):${COLOR.reset}`);
    console.log(`  Raw:    ${formatBytes(mainBundle.rawSize)}`);
    console.log(`  Gzip:   ${formatBytes(mainBundle.gzipSize)} ${COLOR.gray}(${((mainBundle.gzipSize / mainBundle.rawSize) * 100).toFixed(1)}% of raw)${COLOR.reset}`);
    if (mainBundle.brotliSize) {
      console.log(`  Brotli: ${formatBytes(mainBundle.brotliSize)} ${COLOR.gray}(${((mainBundle.brotliSize / mainBundle.rawSize) * 100).toFixed(1)}% of raw)${COLOR.reset}`);
    }
    console.log();
  }

  if (minBundle) {
    console.log(`${COLOR.cyan}Minified Bundle (UMD):${COLOR.reset}`);
    console.log(`  Raw:    ${formatBytes(minBundle.rawSize)}`);
    console.log(`  Gzip:   ${formatBytes(minBundle.gzipSize)} ${COLOR.gray}(${((minBundle.gzipSize / minBundle.rawSize) * 100).toFixed(1)}% of raw)${COLOR.reset}`);
    if (minBundle.brotliSize) {
      console.log(`  Brotli: ${formatBytes(minBundle.brotliSize)} ${COLOR.gray}(${((minBundle.brotliSize / minBundle.rawSize) * 100).toFixed(1)}% of raw)${COLOR.reset}`);
    }
    console.log();
  }

  // Exit with error if limits exceeded
  if (hasExceededLimit) {
    console.log(`${COLOR.red}Bundle size check failed!${COLOR.reset}\n`);
    process.exit(1);
  }

  console.log(`${COLOR.green}Bundle size check passed!${COLOR.reset}\n`);
}

// Run analysis
analyzeBundle();
