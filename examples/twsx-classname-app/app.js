/**
 * tailwind-to-style v4 Demo Application
 * 
 * Demonstrates the unified tw() API:
 * - Mode 1: Atomic classes from string
 * - Mode 2: Named class from string
 * - Mode 3: Variants
 * - Mode 4: Slots (multi-part components)
 */

// Import Tailwind Preflight (CSS Reset)
import '../../preflight.css';

// v4 unified API — one import for everything
import { tw, cx } from '../../src/v4/index.js';
import { createTheme, activateTheme } from '../../src/tokens/index.js';

// ============================================================================
// Theme Definitions
// ============================================================================

const lightTheme = {
  colors: {
    surface: '#f8fafc',
    card: '#ffffff',
    text: '#0f172a',
    border: '#e5e7eb',
    muted: '#6b7280',
    primary: '#2563eb',
  },
};

const darkTheme = {
  colors: {
    surface: '#0f172a',
    card: '#111827',
    text: '#f8fafc',
    border: '#334155',
    muted: '#94a3b8',
    primary: '#60a5fa',
  },
};

let isDarkMode = false;

createTheme(lightTheme, { name: 'light', selector: ':root' });
createTheme(darkTheme, { name: 'dark', selector: ':root' });
activateTheme('light');

function toggleTheme() {
  isDarkMode = !isDarkMode;
  activateTheme(isDarkMode ? 'dark' : 'light');
  render();
}

// ============================================================================
// Layout — Mode 2: Named Classes
// ============================================================================

const appContainer = tw('app', 'min-h-screen bg-[var(--tws-colors-surface)] text-[var(--tws-colors-text)] transition-colors duration-200');
const header = tw('header', 'bg-[var(--tws-colors-surface)] shadow-sm border-b border-[var(--tws-colors-border)] sticky top-0 z-50');
const headerContent = tw('header-content', 'max-w-6xl mx-auto px-4 py-4 flex items-center justify-between');
const logo = tw('logo', 'text-xl font-bold text-[var(--tws-colors-primary)]');
const main = tw('main', 'max-w-6xl mx-auto px-4 py-8');
const section = tw('section', 'mb-12');
const sectionTitle = tw('section-title', 'text-2xl font-bold text-[var(--tws-colors-text)] mb-6 pb-2 border-b border-[var(--tws-colors-border)]');
const grid = tw('grid', 'grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3');
const footer = tw('footer', 'border-t border-[var(--tws-colors-border)] py-8 text-center text-sm text-[var(--tws-colors-muted)]');

// ============================================================================
// Button — Mode 3: Variants
// ============================================================================

const button = tw({
  name: 'btn',
  base: 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 cursor-pointer',
  variants: {
    variant: {
      primary: 'bg-[var(--tws-colors-primary)] text-[var(--tws-colors-surface)] hover:bg-[var(--tws-colors-primary)]/90',
      secondary: 'bg-[var(--tws-colors-border)] text-[var(--tws-colors-text)] hover:bg-[var(--tws-colors-border)]/90',
      outline: 'border-2 border-[var(--tws-colors-primary)] text-[var(--tws-colors-primary)] bg-transparent hover:bg-[var(--tws-colors-primary)]/10',
      ghost: 'text-[var(--tws-colors-text)] bg-transparent hover:bg-[var(--tws-colors-border)]',
      danger: 'bg-red-600 text-white hover:bg-red-700',
      success: 'bg-green-600 text-white hover:bg-green-700',
    },
    size: {
      xs: 'px-2 py-1 text-xs',
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
      xl: 'px-8 py-4 text-xl',
    },
  },
  compoundVariants: [
    { variant: 'primary', size: 'lg', class: 'shadow-lg shadow-blue-500/30' },
  ],
  defaultVariants: { variant: 'primary', size: 'md' },
});

// ============================================================================
// Card — Mode 4: Slots
// ============================================================================

const card = tw({
  name: 'card',
  slots: {
    root: 'bg-[var(--tws-colors-card)] rounded-xl shadow-sm border border-[var(--tws-colors-border)] overflow-hidden hover:shadow-md transition-shadow',
    header: 'px-6 py-4 border-b border-[var(--tws-colors-border)] bg-[var(--tws-colors-surface)]',
    title: 'text-lg font-semibold text-[var(--tws-colors-text)]',
    description: 'text-sm text-[var(--tws-colors-muted)] mt-1',
    body: 'px-6 py-4',
    footer: 'px-6 py-4 border-t border-[var(--tws-colors-border)] bg-[var(--tws-colors-surface)] flex gap-2',
  },
});

// ============================================================================
// Input — Mode 3: Variants
// ============================================================================

const input = tw({
  name: 'input',
  base: 'block w-full rounded-lg border bg-[var(--tws-colors-surface)] text-[var(--tws-colors-text)] transition-all duration-200 focus:outline-none focus:ring-2',
  variants: {
    size: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-5 py-3 text-lg',
    },
    state: {
      default: 'border-[var(--tws-colors-border)] focus:border-[var(--tws-colors-primary)] focus:ring-[var(--tws-colors-primary)]/20',
      error: 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
      success: 'border-green-500 focus:border-green-500 focus:ring-green-500/20',
    },
  },
  defaultVariants: { size: 'md', state: 'default' },
});

// ============================================================================
// Badge
// ============================================================================

const badge = tw({
  name: 'badge',
  base: 'inline-flex items-center font-medium rounded-full',
  variants: {
    variant: {
      default: 'bg-gray-100 text-gray-800',
      primary: 'bg-blue-100 text-blue-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      danger: 'bg-red-100 text-red-800',
    },
    size: {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
      lg: 'px-3 py-1.5 text-base',
    },
  },
  defaultVariants: { variant: 'default', size: 'md' },
});

// ============================================================================
// Alert
// ============================================================================

const alert = tw({
  name: 'alert',
  base: 'p-4 rounded-lg border',
  variants: {
    variant: {
      info: 'bg-blue-50 border-blue-200 text-blue-800',
      success: 'bg-green-50 border-green-200 text-green-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      error: 'bg-red-50 border-red-200 text-red-800',
    },
  },
  defaultVariants: { variant: 'info' },
});

// ============================================================================
// Table — Mode 4: Slots
// ============================================================================

const table = tw({
  name: 'table',
  slots: {
    wrapper: 'overflow-x-auto rounded-lg border border-[var(--tws-colors-border)]',
    table: 'w-full text-left',
    thead: 'bg-[var(--tws-colors-surface)] border-b border-[var(--tws-colors-border)]',
    th: 'px-4 py-3 text-sm font-semibold text-[var(--tws-colors-text)]',
    tbody: 'divide-y divide-[var(--tws-colors-border)]',
    tr: 'bg-[var(--tws-colors-card)] hover:bg-[var(--tws-colors-surface)] transition-colors',
    td: 'px-4 py-3 text-sm text-[var(--tws-colors-text)]',
  },
});

// ============================================================================
// Render
// ============================================================================

function render() {
  const app = document.getElementById('app');
  const cardClasses = card();
  const tableClasses = table();

  app.innerHTML = `
    <div class="${appContainer}">
      <header class="${header}">
        <div class="${headerContent}">
          <div class="${logo}">🎨 tw() v4 Demo</div>
          <button id="theme-toggle" class="${button({ variant: 'ghost', size: 'sm' })}">
            ${isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      </header>

      <main class="${main}">

        <!-- Buttons -->
        <section class="${section}">
          <h2 class="${sectionTitle}">Buttons (Variants)</h2>
          <div class="${tw('space-y-6')}">
            <div>
              <p class="${tw('text-sm text-gray-500 mb-3')}">Variants</p>
              <div class="${tw('flex flex-wrap gap-3')}">
                <button class="${button({ variant: 'primary' })}">Primary</button>
                <button class="${button({ variant: 'secondary' })}">Secondary</button>
                <button class="${button({ variant: 'outline' })}">Outline</button>
                <button class="${button({ variant: 'ghost' })}">Ghost</button>
                <button class="${button({ variant: 'danger' })}">Danger</button>
                <button class="${button({ variant: 'success' })}">Success</button>
              </div>
            </div>
            <div>
              <p class="${tw('text-sm text-gray-500 mb-3')}">Sizes</p>
              <div class="${tw('flex flex-wrap items-center gap-3')}">
                <button class="${button({ size: 'xs' })}">XS</button>
                <button class="${button({ size: 'sm' })}">SM</button>
                <button class="${button({ size: 'md' })}">MD</button>
                <button class="${button({ size: 'lg' })}">LG</button>
                <button class="${button({ size: 'xl' })}">XL</button>
              </div>
            </div>
            <div>
              <p class="${tw('text-sm text-gray-500 mb-3')}">With cx() merge</p>
              <div class="${tw('flex flex-wrap gap-3')}">
                <button class="${cx(button({ variant: 'primary' }), 'shadow-xl')}">Merged Classes</button>
              </div>
            </div>
          </div>
        </section>

        <!-- Cards -->
        <section class="${section}">
          <h2 class="${sectionTitle}">Cards (Slots)</h2>
          <div class="${grid}">
            <div class="${cardClasses.root}">
              <div class="${cardClasses.header}">
                <h3 class="${cardClasses.title}">Card Title</h3>
                <p class="${cardClasses.description}">Slots-based component</p>
              </div>
              <div class="${cardClasses.body}">
                <p class="${tw('text-gray-600')}">Multi-part components with typed slot access.</p>
              </div>
              <div class="${cardClasses.footer}">
                <button class="${button({ variant: 'ghost', size: 'sm' })}">Cancel</button>
                <button class="${button({ size: 'sm' })}">Save</button>
              </div>
            </div>
            <div class="${cardClasses.root}">
              <div class="${cardClasses.header}">
                <h3 class="${cardClasses.title}">Another Card</h3>
              </div>
              <div class="${cardClasses.body}">
                <p class="${tw('text-gray-600')}">All styling happens at runtime, zero build step.</p>
              </div>
            </div>
            <div class="${cardClasses.root}">
              <div class="${cardClasses.header}">
                <h3 class="${cardClasses.title}">Third Card</h3>
              </div>
              <div class="${cardClasses.body}">
                <p class="${tw('text-gray-600')}">Responsive grid layout via tw().</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Inputs -->
        <section class="${section}">
          <h2 class="${sectionTitle}">Form Inputs</h2>
          <div class="${tw('space-y-4 max-w-md')}">
            <div>
              <label class="${tw('block text-sm font-medium text-gray-700 mb-1')}">Default</label>
              <input type="text" placeholder="Type here..." class="${input()}">
            </div>
            <div>
              <label class="${tw('block text-sm font-medium text-gray-700 mb-1')}">Success</label>
              <input type="text" value="Valid" class="${input({ state: 'success' })}">
            </div>
            <div>
              <label class="${tw('block text-sm font-medium text-gray-700 mb-1')}">Error</label>
              <input type="text" value="Invalid" class="${input({ state: 'error' })}">
            </div>
          </div>
        </section>

        <!-- Badges & Alerts -->
        <section class="${section}">
          <h2 class="${sectionTitle}">Badges</h2>
          <div class="${tw('flex flex-wrap gap-2')}">
            <span class="${badge()}">Default</span>
            <span class="${badge({ variant: 'primary' })}">Primary</span>
            <span class="${badge({ variant: 'success' })}">Success</span>
            <span class="${badge({ variant: 'warning' })}">Warning</span>
            <span class="${badge({ variant: 'danger' })}">Danger</span>
          </div>
        </section>

        <section class="${section}">
          <h2 class="${sectionTitle}">Alerts</h2>
          <div class="${tw('space-y-3 max-w-xl')}">
            <div class="${alert({ variant: 'info' })}"><strong>Info:</strong> Informational message.</div>
            <div class="${alert({ variant: 'success' })}"><strong>Success:</strong> Action completed.</div>
            <div class="${alert({ variant: 'warning' })}"><strong>Warning:</strong> Please review.</div>
            <div class="${alert({ variant: 'error' })}"><strong>Error:</strong> Something went wrong.</div>
          </div>
        </section>

        <!-- Table -->
        <section class="${section}">
          <h2 class="${sectionTitle}">Table (Slots)</h2>
          <div class="${tableClasses.wrapper}">
            <table class="${tableClasses.table}">
              <thead class="${tableClasses.thead}">
                <tr>
                  <th class="${tableClasses.th}">Name</th>
                  <th class="${tableClasses.th}">Email</th>
                  <th class="${tableClasses.th}">Status</th>
                </tr>
              </thead>
              <tbody class="${tableClasses.tbody}">
                <tr class="${tableClasses.tr}">
                  <td class="${tableClasses.td}">John Doe</td>
                  <td class="${tableClasses.td}">john@example.com</td>
                  <td class="${tableClasses.td}"><span class="${badge({ variant: 'success', size: 'sm' })}">Active</span></td>
                </tr>
                <tr class="${tableClasses.tr}">
                  <td class="${tableClasses.td}">Jane Smith</td>
                  <td class="${tableClasses.td}">jane@example.com</td>
                  <td class="${tableClasses.td}"><span class="${badge({ variant: 'warning', size: 'sm' })}">Pending</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </main>

      <footer class="${footer}">
        <p>Built with <strong>tw()</strong> v4 — No external CSS, no build step</p>
        <p style="margin-top: 0.25rem;">tailwind-to-style © 2025</p>
      </footer>
    </div>
  `;

  const themeToggle = document.getElementById('theme-toggle');
  themeToggle?.addEventListener('click', toggleTheme);
}

render();

console.log('✨ tw() v4 Demo loaded!');
