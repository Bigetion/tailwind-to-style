import React, { useState } from "react";
import { cx, styles } from "@bench/styles";

function Button({ tone = "primary", size = "md", className, children, ...props }) {
  return <button {...props} className={cx(styles.button({ tone, size }), className)}>{children}</button>;
}

function Badge({ tone = "neutral", children }) {
  return <span className={styles.badge({ tone })}>{children}</span>;
}

function Card({ title, children }) {
  const slots = styles.card();
  return (
    <section className={slots.root}>
      <header className={slots.header}><strong>{title}</strong></header>
      <div className={slots.body}>{children}</div>
    </section>
  );
}

function Input({ label, state = "default", ...props }) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      <input {...props} className={styles.input({ state })} />
    </label>
  );
}

export function App() {
  const [count, setCount] = useState(1);

  return (
    <main className={styles.page}>
      <header className={styles.intro}>
        <h1>Component styling benchmark</h1>
        <p>Same React UI, variants, slots, and interactions in both builds.</p>
      </header>

      <div className={styles.grid}>
        <Card title="Button variants">
          <div className={styles.row}>
            <Button>Primary</Button>
            <Button tone="secondary">Secondary</Button>
            <Button tone="outline">Outline</Button>
            <Button tone="danger">Danger</Button>
          </div>
          <div className={styles.row}>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </Card>

        <Card title="Badge variants">
          <div className={styles.row}>
            <Badge>Neutral</Badge>
            <Badge tone="primary">Primary</Badge>
            <Badge tone="success">Success</Badge>
            <Badge tone="warning">Warning</Badge>
          </div>
        </Card>

        <Card title="Form input">
          <div className={styles.fields}>
            <Input label="Email" placeholder="you@example.com" />
            <Input label="Username" state="error" defaultValue="john_doe" />
          </div>
        </Card>

        <Card title="Runtime variant selection">
          <div className={styles.row}>
            <Button tone={count === 0 ? "secondary" : count > 0 ? "primary" : "danger"} onClick={() => setCount((value) => value - 1)}>
              Count: {count}
            </Button>
            <Button tone="outline" onClick={() => setCount(1)}>Reset</Button>
          </div>
        </Card>
      </div>
    </main>
  );
}
