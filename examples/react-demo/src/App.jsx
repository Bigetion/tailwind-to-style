import React, { useState, useEffect } from 'react';
import { tw, cx } from 'tailwind-to-style';
import {
  Palette, Sparkles,
  ChevronDown, AlertCircle, UserCircle, Tag, Navigation,
  MousePointerClick, CreditCard, CheckSquare, MessageSquare,
  ChevronDownSquare, TextCursorInput, ArrowLeftRight, Layers,
  BarChart2, ListFilter, Bone, SlidersHorizontal, Loader2,
  LayoutDashboard, ListChecks, Table2, LayoutTemplate,
  Hash, AlignLeft, GitCommitHorizontal, Bell, ToggleLeft, MessageCircle,
} from 'lucide-react';

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

// ─── Nav data ─────────────────────────────────────────────────────────────────

const NAV_GROUPS = [
  {
    group: 'Library Features',
    items: [
      { id: 'theme',      label: 'Tokens & Themes', icon: Palette,           component: ThemeDemo },
      { id: 'animations', label: 'Animations',       icon: Sparkles,          component: AnimationsDemo },
    ],
  },
  {
    group: 'Components',
    items: [
      { id: 'accordion',  label: 'Accordion',  icon: ChevronDown,         component: AccordionDemo },
      { id: 'alert',      label: 'Alert',      icon: AlertCircle,         component: AlertDemo },
      { id: 'avatar',     label: 'Avatar',     icon: UserCircle,          component: AvatarDemo },
      { id: 'badge',      label: 'Badge',      icon: Tag,                 component: BadgeDemo },
      { id: 'breadcrumb', label: 'Breadcrumb', icon: Navigation,          component: BreadcrumbDemo },
      { id: 'button',     label: 'Button',     icon: MousePointerClick,   component: ButtonDemo },
      { id: 'card',       label: 'Card',       icon: CreditCard,          component: CardDemo },
      { id: 'checkbox',   label: 'Checkbox',   icon: CheckSquare,         component: CheckboxDemo },
      { id: 'dialog',     label: 'Dialog',     icon: MessageSquare,       component: DialogDemo },
      { id: 'dropdown',   label: 'Dropdown',   icon: ChevronDownSquare,   component: DropdownDemo },
      { id: 'input',      label: 'Input',      icon: TextCursorInput,     component: InputDemo },
      { id: 'pagination', label: 'Pagination', icon: ArrowLeftRight,      component: PaginationDemo },
      { id: 'popover',    label: 'Popover',    icon: Layers,              component: PopoverDemo },
      { id: 'progress',   label: 'Progress',   icon: BarChart2,           component: ProgressDemo },
      { id: 'select',     label: 'Select',     icon: ListFilter,          component: SelectDemo },
      { id: 'skeleton',   label: 'Skeleton',   icon: Bone,                component: SkeletonDemo },
      { id: 'slider',     label: 'Slider',     icon: SlidersHorizontal,   component: SliderDemo },
      { id: 'spinner',    label: 'Spinner',    icon: Loader2,             component: SpinnerDemo },
      { id: 'statcard',   label: 'StatCard',   icon: LayoutDashboard,     component: StatCardDemo },
      { id: 'stepper',    label: 'Stepper',    icon: ListChecks,          component: StepperDemo },
      { id: 'table',      label: 'Table',      icon: Table2,              component: TableDemo },
      { id: 'tabs',       label: 'Tabs',       icon: LayoutTemplate,      component: TabsDemo },
      { id: 'tag',        label: 'Tag',        icon: Hash,                component: TagDemo },
      { id: 'textarea',   label: 'Textarea',   icon: AlignLeft,           component: TextareaDemo },
      { id: 'timeline',   label: 'Timeline',   icon: GitCommitHorizontal, component: TimelineDemo },
      { id: 'toast',      label: 'Toast',      icon: Bell,                component: ToastDemo },
      { id: 'toggle',     label: 'Toggle',     icon: ToggleLeft,          component: ToggleDemo },
      { id: 'tooltip',    label: 'Tooltip',    icon: MessageCircle,       component: TooltipDemo },
    ],
  },
];

const ALL_ITEMS = NAV_GROUPS.flatMap(g => g.items);

// ─── Styles ───────────────────────────────────────────────────────────────────

// Root layout — h-screen + overflow-hidden so only inner panels scroll
const layout = tw('app-layout', 'flex h-screen overflow-hidden bg-gray-50');

// Desktop sidebar — always full height, scrolls independently
const desktopSidebar = tw('app-sidebar', 'hidden md:flex w-56 shrink-0 flex-col bg-white border-r border-gray-200 h-full overflow-y-auto');

// Sidebar internals
const sidebarHeader = tw('sidebar-header', 'px-5 py-4 border-b border-gray-100 shrink-0');
const sidebarLogo   = tw('sidebar-logo',   'text-sm font-bold text-gray-900 leading-tight');
const sidebarSub    = tw('sidebar-sub',    'text-xs text-gray-400 mt-0.5');
const sidebarNav    = tw('sidebar-nav',    'flex-1 overflow-y-auto py-3 px-2');
const navGroup      = tw('nav-group',      'mb-2');
const navItems      = tw('nav-items',      'space-y-0.5');
const navGroupLabel = tw('nav-group-label', 'text-[0.55rem] font-semibold text-gray-400 uppercase tracking-wider px-3 pt-3 pb-1');

const navItem = tw({
  name: 'nav-item',
  base: 'w-full text-left px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-100 cursor-pointer bg-transparent border-none flex items-center gap-2.5',
  variants: {
    active: {
      true:  'bg-blue-50 text-blue-700',
      false: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
    },
  },
  defaultVariants: { active: false },
});

// Mobile drawer backdrop
const backdrop = tw('app-backdrop', 'fixed inset-0 z-40 bg-black/40 md:hidden');

// Mobile drawer panel
const drawerBase = tw('app-drawer', 'fixed top-0 left-0 bottom-0 z-50 w-64 flex flex-col bg-white shadow-xl transition-transform duration-200 ease-in-out md:hidden');

// Drawer close button
const drawerClose = tw('drawer-close', 'absolute top-3 right-3 p-1 rounded-md text-gray-500 hover:bg-gray-100 bg-transparent border-none cursor-pointer flex items-center');

// Main column — fills remaining space, inner content scrolls
const mainCol = tw('app-main', 'flex-1 min-w-0 flex flex-col h-full overflow-hidden');

// Topbar
const topbar      = tw('app-topbar',       'sticky top-0 z-30 flex items-center gap-2 bg-white border-b border-gray-200 px-4 py-2.5 min-w-0');
const hamburger   = tw('app-hamburger',    'flex md:hidden items-center p-1 rounded-md text-gray-700 hover:bg-gray-100 bg-transparent border-none cursor-pointer shrink-0');
const topbarTitle = tw('app-topbar-title', 'flex-1 min-w-0 text-lg font-semibold text-gray-900 truncate');
const topbarBadge = tw('app-topbar-badge', 'shrink-0 text-[0.7rem] font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-600');

// Content area
const content = tw('app-content', 'flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 min-w-0');

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function IconMenu() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
      <line x1="3" y1="5"  x2="17" y2="5" />
      <line x1="3" y1="10" x2="17" y2="10" />
      <line x1="3" y1="15" x2="17" y2="15" />
    </svg>
  );
}

function IconX() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
      <line x1="4" y1="4"  x2="16" y2="16" />
      <line x1="16" y1="4" x2="4"  y2="16" />
    </svg>
  );
}

// ─── Sidebar content (shared between desktop + mobile drawer) ─────────────────

function SidebarContent({ activeId, onSelect }) {
  return (
    <>
      <div className={sidebarHeader}>
        <p className={sidebarLogo}>tailwind-to-style</p>
        <p className={sidebarSub}>Component demos</p>
      </div>
      <nav className={sidebarNav}>
        {NAV_GROUPS.map((group) => (
          <div key={group.group} className={navGroup}>
            <p className={navGroupLabel}>{group.group}</p>
            <div className={navItems}>
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    className={navItem({ active: item.id === activeId })}
                    onClick={() => onSelect(item.id)}
                  >
                    <Icon size={14} strokeWidth={2} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeId, setActiveId]     = useState('theme');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const active = ALL_ITEMS.find(n => n.id === activeId) || ALL_ITEMS[0];
  const Demo   = active.component;

  const handleSelect = (id) => {
    setActiveId(id);
    setDrawerOpen(false);
    document.getElementById('main-content')?.scrollTo(0, 0);
  };

  // Close drawer on Escape
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') setDrawerOpen(false); };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  return (
    <div className={layout}>

      {/* ── Desktop sidebar (hidden on mobile via hidden md:flex) ── */}
      <aside className={desktopSidebar}>
        <SidebarContent activeId={activeId} onSelect={handleSelect} />
      </aside>

      {/* ── Mobile drawer backdrop ── */}
      {drawerOpen && (
        <div className={backdrop} onClick={() => setDrawerOpen(false)} />
      )}

      {/* ── Mobile drawer panel ── */}
      <aside className={cx(drawerBase, drawerOpen ? tw('translate-x-0') : tw('-translate-x-full'))}>
        <button className={drawerClose} onClick={() => setDrawerOpen(false)} aria-label="Close menu">
          <IconX />
        </button>
        <SidebarContent activeId={activeId} onSelect={handleSelect} />
      </aside>

      {/* ── Main column ── */}
      <div className={mainCol}>

        {/* Topbar */}
        <header className={topbar}>
          <button
            className={hamburger}
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <IconMenu />
          </button>

          <h1 className={topbarTitle}>{active.label}</h1>

          <span className={topbarBadge}>demo</span>
        </header>

        {/* Content */}
        <main id="main-content" className={content}>
          <Demo />
        </main>

      </div>
    </div>
  );
}
