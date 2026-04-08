/**
 * twsxClassName Demo Application
 * 
 * - twsxClassName: komponen reusable (button, card, input, dll)
 * - tw(): atomic CSS classes (layout kecil, support hover/responsive)
 */

// Import Tailwind Preflight (CSS Reset)
import '../../preflight.css';

import { twsxClassName, tw } from '../../src/className/index.js';

// ============================================================================
// Layout Components
// ============================================================================

const appContainer = twsxClassName({
  name: 'app',
  _: 'min-h-screen bg-gray-50 text-gray-900',
});

const header = twsxClassName({
  name: 'header',
  _: 'bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50',
});

const headerContent = twsxClassName({
  name: 'header-content',
  _: 'max-w-6xl mx-auto px-4 py-4 flex items-center justify-between',
});

const logo = twsxClassName({
  name: 'logo',
  _: 'text-xl font-bold text-blue-600',
});

const main = twsxClassName({
  name: 'main',
  _: 'max-w-6xl mx-auto px-4 py-8',
});

const section = twsxClassName({
  name: 'section',
  _: 'mb-12',
});

const sectionTitle = twsxClassName({
  name: 'section-title',
  _: 'text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200',
});

const grid = twsxClassName({
  name: 'grid',
  _: 'grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
});

// Footer
const footer = twsxClassName({
  name: 'footer',
  _: 'border-t border-gray-200 py-8 text-center text-sm text-gray-500',
});

// ============================================================================
// Button Component (Variants)
// ============================================================================

const button = twsxClassName({
  name: 'btn',
  base: 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 cursor-pointer',
  variants: {
    variant: {
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
      outline: 'border-2 border-blue-600 text-blue-600 bg-transparent hover:bg-blue-50',
      ghost: 'text-gray-600 bg-transparent hover:bg-gray-100',
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
    {
      variant: 'primary',
      size: 'lg',
      class: 'shadow-lg shadow-blue-500/30',
    },
  ],
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

// ============================================================================
// Card Component (Slots)
// ============================================================================

const card = twsxClassName({
  name: 'card',
  slots: {
    root: 'bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow',
    header: 'px-6 py-4 border-b border-gray-200 bg-gray-50',
    title: 'text-lg font-semibold text-gray-900',
    description: 'text-sm text-gray-500 mt-1',
    body: 'px-6 py-4',
    footer: 'px-6 py-4 border-t border-gray-200 bg-gray-50 flex gap-2',
  },
});

// ============================================================================
// Input Component
// ============================================================================

const input = twsxClassName({
  name: 'input',
  base: 'block w-full rounded-lg border bg-white text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2',
  variants: {
    size: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-5 py-3 text-lg',
    },
    state: {
      default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20',
      error: 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
      success: 'border-green-500 focus:border-green-500 focus:ring-green-500/20',
    },
  },
  defaultVariants: {
    size: 'md',
    state: 'default',
  },
});

// ============================================================================
// Badge Component
// ============================================================================

const badge = twsxClassName({
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
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

// ============================================================================
// Alert Component
// ============================================================================

const alert = twsxClassName({
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
  defaultVariants: {
    variant: 'info',
  },
});

// ============================================================================
// Avatar Component
// ============================================================================

const avatar = twsxClassName({
  name: 'avatar',
  base: 'inline-flex items-center justify-center rounded-full bg-gray-200 text-gray-600 font-medium overflow-hidden',
  variants: {
    size: {
      xs: 'w-6 h-6 text-xs',
      sm: 'w-8 h-8 text-sm',
      md: 'w-10 h-10 text-base',
      lg: 'w-12 h-12 text-lg',
      xl: 'w-16 h-16 text-xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

// ============================================================================
// Table Component (Slots)
// ============================================================================

const table = twsxClassName({
  name: 'table',
  slots: {
    wrapper: 'overflow-x-auto rounded-lg border border-gray-200',
    table: 'w-full text-left',
    thead: 'bg-gray-50 border-b border-gray-200',
    th: 'px-4 py-3 text-sm font-semibold text-gray-900',
    tbody: 'divide-y divide-gray-200',
    tr: 'bg-white hover:bg-gray-50 transition-colors',
    td: 'px-4 py-3 text-sm text-gray-700',
  },
});

// ============================================================================
// Render Application
// ============================================================================

function render() {
  const app = document.getElementById('app');
  
  // Inject all CSS
  document.head.insertAdjacentHTML('beforeend', twsxClassName.extractCSS());
  
  // Get slot classes
  const cardClasses = card();
  const tableClasses = table();
  
  app.innerHTML = `
    <div class="${appContainer}">
      <!-- Header -->
      <header class="${header}">
        <div class="${headerContent}">
          <div class="${logo}">🎨 twsxClassName Demo</div>
          <button class="${button({ variant: 'ghost', size: 'sm' })}">
            🌙 Toggle Theme
          </button>
        </div>
      </header>
      
      <!-- Main Content -->
      <main class="${main}">
        
        <!-- Buttons Section -->
        <section class="${section}">
          <h2 class="${sectionTitle}">Buttons (Variants)</h2>
          
          <div class="${tw('space-y-6')}">
            <!-- Variants -->
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
            
            <!-- Sizes -->
            <div>
              <p class="${tw('text-sm text-gray-500 mb-3')}">Sizes</p>
              <div class="${tw('flex flex-wrap items-center gap-3')}">
                <button class="${button({ size: 'xs' })}">Extra Small</button>
                <button class="${button({ size: 'sm' })}">Small</button>
                <button class="${button({ size: 'md' })}">Medium</button>
                <button class="${button({ size: 'lg' })}">Large</button>
                <button class="${button({ size: 'xl' })}">Extra Large</button>
              </div>
            </div>
            
            <!-- Compound Variant -->
            <div>
              <p class="${tw('text-sm text-gray-500 mb-3')}">Compound Variants (Large Primary has shadow)</p>
              <div class="${tw('flex flex-wrap gap-3')}">
                <button class="${button({ variant: 'primary', size: 'lg' })}">Large Primary (Shadow)</button>
              </div>
            </div>
          </div>
        </section>
        
        <!-- Cards Section -->
        <section class="${section}">
          <h2 class="${sectionTitle}">Cards (Slots)</h2>
          
          <div class="${grid}">
            <!-- Card 1 -->
            <div class="${cardClasses.root}">
              <div class="${cardClasses.header}">
                <h3 class="${cardClasses.title}">Card Title</h3>
                <p class="${cardClasses.description}">Card description text</p>
              </div>
              <div class="${cardClasses.body}">
                <p class="${tw('text-gray-600')}">This is the card body content using slots API.</p>
              </div>
              <div class="${cardClasses.footer}">
                <button class="${button({ variant: 'ghost', size: 'sm' })}">Cancel</button>
                <button class="${button({ size: 'sm' })}">Save</button>
              </div>
            </div>
            
            <!-- Card 2 -->
            <div class="${cardClasses.root}">
              <div class="${cardClasses.header}">
                <h3 class="${cardClasses.title}">Another Card</h3>
                <p class="${cardClasses.description}">With different content</p>
              </div>
              <div class="${cardClasses.body}">
                <p class="${tw('text-gray-600')}">Cards can be customized with variants too.</p>
              </div>
            </div>
            
            <!-- Card 3 -->
            <div class="${cardClasses.root}">
              <div class="${cardClasses.header}">
                <h3 class="${cardClasses.title}">Third Card</h3>
              </div>
              <div class="${cardClasses.body}">
                <p class="${tw('text-gray-600')}">Responsive grid layout.</p>
              </div>
            </div>
          </div>
        </section>
        
        <!-- Form Inputs Section -->
        <section class="${section}">
          <h2 class="${sectionTitle}">Form Inputs</h2>
          
          <div class="${tw('space-y-4 max-w-md')}">
            <div>
              <label class="${tw('block text-sm font-medium text-gray-700 mb-1')}">Default Input</label>
              <input type="text" placeholder="Enter text..." class="${input()}">
            </div>
            <div>
              <label class="${tw('block text-sm font-medium text-gray-700 mb-1')}">Success State</label>
              <input type="text" value="Valid input" class="${input({ state: 'success' })}">
            </div>
            <div>
              <label class="${tw('block text-sm font-medium text-gray-700 mb-1')}">Error State</label>
              <input type="text" value="Invalid input" class="${input({ state: 'error' })}">
            </div>
          </div>
        </section>
        
        <!-- Badges Section -->
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
        
        <!-- Alerts Section -->
        <section class="${section}">
          <h2 class="${sectionTitle}">Alerts</h2>
          
          <div class="${tw('space-y-3 max-w-xl')}">
            <div class="${alert({ variant: 'info' })}">
              <strong>Info:</strong> This is an informational alert message.
            </div>
            <div class="${alert({ variant: 'success' })}">
              <strong>Success:</strong> Your action was completed successfully.
            </div>
            <div class="${alert({ variant: 'warning' })}">
              <strong>Warning:</strong> Please review this before continuing.
            </div>
            <div class="${alert({ variant: 'error' })}">
              <strong>Error:</strong> Something went wrong. Please try again.
            </div>
          </div>
        </section>
        
        <!-- Avatars Section -->
        <section class="${section}">
          <h2 class="${sectionTitle}">Avatars</h2>
          
          <div class="${tw('flex items-center gap-4')}">
            <div class="${avatar({ size: 'xs' })}">XS</div>
            <div class="${avatar({ size: 'sm' })}">SM</div>
            <div class="${avatar({ size: 'md' })}">MD</div>
            <div class="${avatar({ size: 'lg' })}">LG</div>
            <div class="${avatar({ size: 'xl' })}">XL</div>
          </div>
        </section>
        
        <!-- Table Section -->
        <section class="${section}">
          <h2 class="${sectionTitle}">Table (Slots)</h2>
          
          <div class="${tableClasses.wrapper}">
            <table class="${tableClasses.table}">
              <thead class="${tableClasses.thead}">
                <tr>
                  <th class="${tableClasses.th}">Name</th>
                  <th class="${tableClasses.th}">Email</th>
                  <th class="${tableClasses.th}">Role</th>
                  <th class="${tableClasses.th}">Status</th>
                </tr>
              </thead>
              <tbody class="${tableClasses.tbody}">
                <tr class="${tableClasses.tr}">
                  <td class="${tableClasses.td}">John Doe</td>
                  <td class="${tableClasses.td}">john@example.com</td>
                  <td class="${tableClasses.td}">Admin</td>
                  <td class="${tableClasses.td}"><span class="${badge({ variant: 'success', size: 'sm' })}">Active</span></td>
                </tr>
                <tr class="${tableClasses.tr}">
                  <td class="${tableClasses.td}">Jane Smith</td>
                  <td class="${tableClasses.td}">jane@example.com</td>
                  <td class="${tableClasses.td}">User</td>
                  <td class="${tableClasses.td}"><span class="${badge({ variant: 'success', size: 'sm' })}">Active</span></td>
                </tr>
                <tr class="${tableClasses.tr}">
                  <td class="${tableClasses.td}">Bob Wilson</td>
                  <td class="${tableClasses.td}">bob@example.com</td>
                  <td class="${tableClasses.td}">Editor</td>
                  <td class="${tableClasses.td}"><span class="${badge({ variant: 'warning', size: 'sm' })}">Pending</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        
        <!-- API Features Used -->
        <section class="${section}">
          <h2 class="${sectionTitle}">API Features Demonstrated</h2>
          
          <div class="${grid}">
            ${[
              { title: 'twsxClassName', desc: 'Komponen reusable (button, card)' },
              { title: 'tw()', desc: 'Atomic CSS classes (hover, responsive)' },
              { title: 'Variants', desc: 'Multiple variant props (size, color)' },
              { title: 'Slots', desc: 'Multi-part components (card, table)' },
              { title: 'Compound Variants', desc: 'Combined variant styles' },
              { title: 'SSR Support', desc: 'extractCSS() for server rendering' },
            ].map(item => `
              <div class="${cardClasses.root}">
                <div class="${cardClasses.body}">
                  <h4 class="${tw('font-semibold text-gray-900')}">${item.title}</h4>
                  <p class="${tw('text-sm text-gray-500 mt-1')}">${item.desc}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </section>
        
      </main>
      
      <!-- Footer -->
      <footer class="${footer}">
        <p>Built with <strong>twsxClassName</strong> + <strong>tw()</strong> - No external CSS!</p>
        <p style="margin-top: 0.25rem;">tailwind-to-style © 2026</p>
      </footer>
    </div>
  `;
}

// Initialize
render();
console.log('✨ twsxClassName Demo App loaded!');
console.log('📊 Cache Stats:', twsxClassName.getCacheStats());
