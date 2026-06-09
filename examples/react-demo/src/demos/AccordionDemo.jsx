import React from 'react';
import { twsxClassName } from 'tailwind-to-style';
import { Accordion } from '../components/Accordion';
import { HelpCircle, CreditCard, Truck, RotateCcw, Shield, Zap, Code, Palette } from 'lucide-react';

const section = twsxClassName({ name: 'demo-section', _: 'mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm' });
const sectionTitle = twsxClassName({ name: 'demo-title', _: 'text-xl font-semibold text-gray-900 mb-4' });
const label = twsxClassName({ name: 'demo-label', _: 'text-sm text-gray-500 mb-3 font-medium' });

export function AccordionDemo() {
  return (
    <div>
      {/* FAQ */}
      <div className={section}>
        <h2 className={sectionTitle}>Accordion — FAQ</h2>
        <p className={label}>Single panel open at a time (default behavior)</p>
        <div style={{ maxWidth: '36rem' }}>
          <Accordion
            defaultOpen={[0]}
            items={[
              {
                title: 'What is tailwind-to-style?',
                icon: <HelpCircle size={14} color="#6b7280" />,
                content: 'A zero-build runtime Tailwind CSS engine that converts utility classes to real CSS with variants, slots, design tokens, and React bindings. No PostCSS, no config file needed.',
              },
              {
                title: 'Do I need Tailwind CSS installed?',
                icon: <HelpCircle size={14} color="#6b7280" />,
                content: 'No! tailwind-to-style works completely standalone. It has its own runtime CSS generator that understands all Tailwind utility classes. No build step required.',
              },
              {
                title: 'Is it production ready?',
                icon: <HelpCircle size={14} color="#6b7280" />,
                content: 'Yes. It uses LRU caching, batched DOM injection, and tree-shakeable imports for optimal performance. SSR is fully supported.',
              },
              {
                title: 'How does it compare to CVA?',
                icon: <HelpCircle size={14} color="#6b7280" />,
                content: 'CVA is just a class string builder — it still requires Tailwind CSS to be compiled. tailwind-to-style generates actual CSS at runtime, so hover states, responsive breakpoints, and animations all work without a build step.',
              },
            ]}
          />
        </div>
      </div>

      {/* Multiple Open */}
      <div className={section}>
        <h2 className={sectionTitle}>Accordion — Multiple Open</h2>
        <p className={label}>Multiple panels can be open simultaneously</p>
        <div style={{ maxWidth: '36rem' }}>
          <Accordion
            multiple
            defaultOpen={[0, 1]}
            items={[
              {
                title: 'Shipping Information',
                icon: <Truck size={14} color="#6b7280" />,
                content: 'Free shipping on orders over $50. Standard delivery takes 3-5 business days. Express shipping available for an additional fee.',
              },
              {
                title: 'Payment Methods',
                icon: <CreditCard size={14} color="#6b7280" />,
                content: 'We accept Visa, Mastercard, American Express, PayPal, and Apple Pay. All transactions are encrypted and secure.',
              },
              {
                title: 'Returns & Refunds',
                icon: <RotateCcw size={14} color="#6b7280" />,
                content: '30-day money-back guarantee. Items must be in original condition. Refunds are processed within 5-7 business days.',
              },
              {
                title: 'Privacy & Security',
                icon: <Shield size={14} color="#6b7280" />,
                content: 'Your data is encrypted with AES-256. We never share personal information with third parties. GDPR compliant.',
              },
            ]}
          />
        </div>
      </div>

      {/* Features / Docs */}
      <div className={section}>
        <h2 className={sectionTitle}>Accordion — Feature List</h2>
        <p className={label}>Content can be any React element</p>
        <div style={{ maxWidth: '36rem' }}>
          <Accordion
            items={[
              {
                title: 'Zero Build Step',
                icon: <Zap size={14} color="#f59e0b" />,
                content: (
                  <div>
                    <p>No PostCSS, no Webpack plugin, no config files.</p>
                    <code style={{ display: 'block', marginTop: '8px', padding: '8px', background: '#f9fafb', borderRadius: '4px', fontSize: '0.8rem' }}>
                      {`import { tw } from 'tailwind-to-style';`}
                    </code>
                  </div>
                ),
              },
              {
                title: 'Runtime Variants',
                icon: <Code size={14} color="#3b82f6" />,
                content: (
                  <div>
                    <p>Define variants with full type safety:</p>
                    <code style={{ display: 'block', marginTop: '8px', padding: '8px', background: '#f9fafb', borderRadius: '4px', fontSize: '0.8rem', whiteSpace: 'pre' }}>
{`tw({
  name: 'btn',
  base: 'px-4 py-2 rounded',
  variants: { color: { primary: '...' } }
})`}
                    </code>
                  </div>
                ),
              },
              {
                title: 'Design Tokens',
                icon: <Palette size={14} color="#8b5cf6" />,
                content: (
                  <div>
                    <p>CSS variable-based theming with instant swap:</p>
                    <code style={{ display: 'block', marginTop: '8px', padding: '8px', background: '#f9fafb', borderRadius: '4px', fontSize: '0.8rem', whiteSpace: 'pre' }}>
{`createTheme({
  colors: { primary: '#3b82f6' }
});
// → --tws-colors-primary: #3b82f6`}
                    </code>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
