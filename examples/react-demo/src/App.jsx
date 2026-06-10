import React, { useState } from 'react';
import { tw, cx } from 'tailwind-to-style';

import { AccordionDemo } from './demos/AccordionDemo';
import { AlertDemo } from './demos/AlertDemo';
import { AnimationsDemo } from './demos/AnimationsDemo';
import { AvatarDemo } from './demos/AvatarDemo';
import { BadgeDemo } from './demos/BadgeDemo';
import { BreadcrumbDemo } from './demos/BreadcrumbDemo';
import { ButtonDemo } from './demos/ButtonDemo';
import { CardDemo } from './demos/CardDemo';
import { CheckboxDemo } from './demos/CheckboxDemo';
import { DialogDemo } from './demos/DialogDemo';
import { DropdownDemo } from './demos/DropdownDemo';
import { InputDemo } from './demos/InputDemo';
import { PaginationDemo } from './demos/PaginationDemo';
import { PopoverDemo } from './demos/PopoverDemo';
import { ProgressDemo } from './demos/ProgressDemo';
import { SelectDemo } from './demos/SelectDemo';
import { SkeletonDemo } from './demos/SkeletonDemo';
import { SliderDemo } from './demos/SliderDemo';
import { SpinnerDemo } from './demos/SpinnerDemo';
import { StatCardDemo } from './demos/StatCardDemo';
import { StepperDemo } from './demos/StepperDemo';
import { TableDemo } from './demos/TableDemo';
import { TabsDemo } from './demos/TabsDemo';
import { TagDemo } from './demos/TagDemo';
import { TextareaDemo } from './demos/TextareaDemo';
import { ThemeDemo } from './demos/ThemeDemo';
import { TimelineDemo } from './demos/TimelineDemo';
import { ToastDemo } from './demos/ToastDemo';
import { ToggleDemo } from './demos/ToggleDemo';
import { TooltipDemo } from './demos/TooltipDemo';

// ─── Nav items ───────────────────────────────────────────────────────────────

const NAV_GROUPS = [
  {
    group: 'Library Features',
    items: [
      { id: 'theme',      label: '🎨 Tokens & Themes', component: ThemeDemo },
      { id: 'animations', label: '✨ Animations',       component: AnimationsDemo },
    ],
  },
  {
    group: 'Components',
    items: [
      { id: 'accordion',  label: 'Accordion',  component: AccordionDemo },
      { id: 'alert',      label: 'Alert',      component: AlertDemo },
      { id: 'avatar',     label: 'Avatar',     component: AvatarDemo },
      { id: 'badge',      label: 'Badge',      component: BadgeDemo },
      { id: 'breadcrumb', label: 'Breadcrumb', component: BreadcrumbDemo },
      { id: 'button',     label: 'Button',     component: ButtonDemo },
      { id: 'card',       label: 'Card',       component: CardDemo },
      { id: 'checkbox',   label: 'Checkbox',   component: CheckboxDemo },
      { id: 'dialog',     label: 'Dialog',     component: DialogDemo },
      { id: 'dropdown',   label: 'Dropdown',   component: DropdownDemo },
      { id: 'input',      label: 'Input',      component: InputDemo },
      { id: 'pagination', label: 'Pagination', component: PaginationDemo },
      { id: 'popover',    label: 'Popover',    component: PopoverDemo },
      { id: 'progress',   label: 'Progress',   component: ProgressDemo },
      { id: 'select',     label: 'Select',     component: SelectDemo },
      { id: 'skeleton',   label: 'Skeleton',   component: SkeletonDemo },
      { id: 'slider',     label: 'Slider',     component: SliderDemo },
      { id: 'spinner',    label: 'Spinner',    component: SpinnerDemo },
      { id: 'statcard',   label: 'StatCard',   component: StatCardDemo },
      { id: 'stepper',    label: 'Stepper',    component: StepperDemo },
      { id: 'table',      label: 'Table',      component: TableDemo },
      { id: 'tabs',       label: 'Tabs',       component: TabsDemo },
      { id: 'tag',        label: 'Tag',        component: TagDemo },
      { id: 'textarea',   label: 'Textarea',   component: TextareaDemo },
      { id: 'timeline',   label: 'Timeline',   component: TimelineDemo },
      { id: 'toast',      label: 'Toast',      component: ToastDemo },
      { id: 'toggle',     label: 'Toggle',     component: ToggleDemo },
      { id: 'tooltip',    label: 'Tooltip',    component: TooltipDemo },
    ],
  },
];

const ALL_ITEMS = NAV_GROUPS.flatMap(g => g.items);

// ─── Styles ─────────────────────────────────────────────────────────────────

const layout = tw({ name: 'layout', _: 'flex min-h-screen bg-gray-50' });

const sidebar = tw({ name: 'sidebar', _: 'w-56 shrink-0 bg-white border-r border-gray-200 flex flex-col' });

const sidebarHeader = tw({ name: 'sidebar-header', _: 'px-5 py-4 border-b border-gray-100' });

const sidebarLogo = tw({ name: 'sidebar-logo', _: 'text-sm font-bold text-gray-900 leading-tight' });

const sidebarSub = tw({ name: 'sidebar-sub', _: 'text-xs text-gray-400 mt-0.5' });

const navList = tw({ name: 'nav-list', _: 'flex-1 overflow-y-auto py-3 px-2' });

const navItem = tw({
  name: 'nav-item',
  base: 'w-full text-left px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-100 cursor-pointer',
  variants: {
    active: {
      true:  'bg-blue-50 text-blue-700',
      false: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
    },
  },
  defaultVariants: { active: false },
});

const main = tw({ name: 'main', _: 'flex-1 min-w-0 flex flex-col' });

const topbar = tw({ name: 'topbar', _: 'bg-white border-b border-gray-200 px-8 py-4 flex items-center gap-3' });

const topbarTitle = tw({ name: 'topbar-title', _: 'text-xl font-semibold text-gray-900' });

const topbarBadge = tw({ name: 'topbar-badge', _: 'text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-600' });

const content = tw({ name: 'content', _: 'flex-1 overflow-y-auto p-8' });

// ─── App ────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeId, setActiveId] = useState('theme');

  const active = ALL_ITEMS.find((n) => n.id === activeId) || ALL_ITEMS[0];
  const Demo = active.component;

  return (
    <div className={layout}>
      {/* Sidebar */}
      <aside className={sidebar}>
        <div className={sidebarHeader}>
          <p className={sidebarLogo}>tailwind-to-style</p>
          <p className={sidebarSub}>Component demos</p>
        </div>
        <nav className={navList}>
          {NAV_GROUPS.map((group) => (
            <div key={group.group} style={{ marginBottom: '8px' }}>
              <p style={{ fontSize: '0.65rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '4px 12px 2px' }}>
                {group.group}
              </p>
              {group.items.map((item) => (
                <button
                  key={item.id}
                  className={navItem({ active: item.id === activeId })}
                  onClick={() => setActiveId(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className={main}>
        <header className={topbar}>
          <h1 className={topbarTitle}>{active.label}</h1>
          <span className={topbarBadge}>demo</span>
        </header>
        <main className={content}>
          <Demo />
        </main>
      </div>
    </div>
  );
}
