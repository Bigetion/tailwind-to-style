import React from 'react';
import { tw } from 'tailwind-to-style';

const card = tw({
  name: 'card',
  slots: {
    root: 'overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm',
    header: 'flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4',
    title: 'text-sm font-semibold tracking-wide text-slate-900',
    body: 'p-5',
    footer: 'border-t border-slate-200 bg-slate-50 px-5 py-4',
  },
});

function Card({ title, badge, children, footer }) {
  const styles = card();

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        {badge}
      </div>

      <div className={styles.body}>{children}</div>

      {footer ? <div className={styles.footer}>{footer}</div> : null}
    </div>
  );
}

export { Card, card };
