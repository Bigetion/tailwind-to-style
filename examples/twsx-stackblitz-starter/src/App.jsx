import React, { useState } from 'react';
import { tw } from 'tailwind-to-style';
import { Badge } from './components/Badge.jsx';
import { Button } from './components/Button.jsx';
import { Card } from './components/Card.jsx';
import { Counter } from './components/Counter.jsx';
import { Input } from './components/Input.jsx';

const appStyleSlots = tw({
  name: 'app',
  slots: {
    shell: 'min-h-screen bg-slate-50 px-4 py-10 text-slate-900',
    page: 'mx-auto max-w-5xl',
    header: 'mb-8 flex flex-col gap-4',
    brandRow: 'flex items-center gap-3',
    logo: 'text-2xl font-black tracking-tight text-slate-900',
    intro: 'max-w-2xl text-sm text-slate-600',
    sectionTwoCol: 'mb-8 grid gap-5 md:grid-cols-2',
    sectionSplit: 'mb-8 grid gap-5 lg:grid-cols-2',
    detailRow: 'flex flex-wrap gap-2',
    fieldGroup: 'space-y-4',
    fieldLabel: 'mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500',
    counterRow: 'flex items-center justify-between gap-4',
    featureSection: 'rounded-2xl border border-slate-200 bg-white p-5 shadow-sm',
    featureTitle: 'mb-3 text-lg font-bold text-slate-900',
    featureList: 'space-y-2 text-sm text-slate-600',
    codeText: 'text-xs text-slate-500',
    inputError: 'bg-red-50',
  },
});
const styles = appStyleSlots();

function App() {
  const [count, setCount] = useState(3);
  const [email, setEmail] = useState('');

  return (
    <main className={styles.shell}>
      <div className={styles.page}>
        <header className={styles.header}>
          <div className={styles.brandRow}>
            <span className={styles.logo}>tailwind-to-style</span>
            <Badge tone="primary" size="sm">concept demo</Badge>
          </div>

          <p className={styles.intro}>
            A React-based StackBlitz starter concept authored with compact, component-first objects instead of heavy registry boilerplate.
          </p>
        </header>

        <section className={styles.sectionTwoCol}>
          <Card
            title="Button variants"
            badge={<Badge tone="neutral" size="sm">button.js</Badge>}
            footer={<code className={styles.codeText}>&lt;Button variant="primary" /&gt;</code>}
          >
            <div className={styles.detailRow}>
              <Button tone="primary" size="md">Primary</Button>
              <Button tone="secondary" size="md">Secondary</Button>
              <Button tone="outline" size="md">Outline</Button>
              <Button tone="danger" size="md">Danger</Button>
            </div>
          </Card>

          <Card
            title="Status badge"
            badge={<Badge tone="success" size="sm">ready</Badge>}
            footer={<code className={styles.codeText}>{`badge({ tone: 'success' })`}</code>}
          >
            <div className={styles.detailRow}>
              <Badge tone="neutral" size="md">Default</Badge>
              <Badge tone="primary" size="md">Primary</Badge>
              <Badge tone="success" size="md">Success</Badge>
              <Badge tone="warning" size="md">Warning</Badge>
            </div>
          </Card>
        </section>

        <section className={styles.sectionSplit}>
          <Card title="Input field" badge={<Badge tone="neutral" size="sm">form</Badge>}>
            <div className={styles.fieldGroup}>
              <div>
                <label className={styles.fieldLabel}>Email</label>
                <Input
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div>
                <label className={styles.fieldLabel}>Username</label>
                <Input state="error" className={styles.inputError} defaultValue="john_doe" />
              </div>
            </div>
          </Card>

          <Card title="Counter" badge={<Badge tone="warning" size="sm">stateful</Badge>}>
            <div className={styles.counterRow}>
              <Counter
                value={count}
                onDecrement={() => setCount((value) => Math.max(0, value - 1))}
                onIncrement={() => setCount((value) => value + 1)}
                onReset={() => setCount(0)}
              />
            </div>
          </Card>
        </section>

        <section className={styles.featureSection}>
          <h2 className={styles.featureTitle}>Why this feels better</h2>
          <ul className={styles.featureList}>
            <li>• Style stays close to the actual component definition.</li>
            <li>• One object per component, not a scattered registry workflow.</li>
            <li>• Easy to reuse, compose, and export to static CSS at build time.</li>
            <li>• Still compatible with the runtime-first power of tailwind-to-style.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}

export { App };
