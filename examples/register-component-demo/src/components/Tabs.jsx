import React, { useState } from 'react';
import { cx } from 'tailwind-to-style/register';

export function Tabs({ tabs, defaultTab, className }) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id);
  const current = tabs.find(t => t.id === active);

  return (
    <div className={cx('tabs', className)}>
      <div className="tabs-list">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={active === tab.id ? 'tabs-tab-active' : 'tabs-tab'}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tabs-panel">{current?.content}</div>
    </div>
  );
}
