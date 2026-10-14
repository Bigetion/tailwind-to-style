import React from 'react';
import { cx, tw } from 'tailwind-to-style';

const counterStyleSlots = tw({
  name: 'counter',
  slots: {
    root: 'flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2',
    button: 'h-8 w-8 rounded-lg bg-slate-100 text-lg font-bold text-slate-700 hover:bg-slate-200',
    value: 'min-w-8 text-center text-xl font-bold text-slate-900',
    reset: 'ml-2 rounded-lg border border-slate-200 px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50',
  },
});
const styles = counterStyleSlots();

function Counter({ value, onDecrement, onIncrement, onReset, className = '' }) {
  return (
    <div className={cx(styles.root, className)}>
      <button type="button" className={styles.button} onClick={onDecrement}>
        -
      </button>
      <span className={styles.value}>{value}</span>
      <button type="button" className={styles.button} onClick={onIncrement}>
        +
      </button>
      {onReset ? (
        <button type="button" className={styles.reset} onClick={onReset}>
          Reset
        </button>
      ) : null}
    </div>
  );
}

export { Counter, styles as counter };
