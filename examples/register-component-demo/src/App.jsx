import React, { useState } from 'react';
import { cx } from 'tailwind-to-style/register';

// Components
import { Button, IconButton } from './components/Button';
import { Badge } from './components/Badge';
import { Input } from './components/Input';
import { Textarea } from './components/Textarea';
import { Card, CardHeader, CardTitle, CardBody, CardFooter } from './components/Card';
import { Avatar, AvatarGroup } from './components/Avatar';
import { Alert } from './components/Alert';
import { Spinner } from './components/Spinner';
import { Skeleton, SkeletonCard } from './components/Skeleton';
import { Progress } from './components/Progress';
import { Tabs } from './components/Tabs';
import { Accordion } from './components/Accordion';
import { Toggle } from './components/Toggle';
import { Checkbox } from './components/Checkbox';
import { Tag } from './components/Tag';
import { Select } from './components/Select';
import { Breadcrumb } from './components/Breadcrumb';
import { Pagination } from './components/Pagination';
import { Tooltip } from './components/Tooltip';
import { Dialog } from './components/Dialog';
import { Table } from './components/Table';
import { ToastContainer, useToast } from './components/Toast';

import {
  MousePointerClick, Tag as TagIcon, TextCursorInput, AlignLeft,
  CreditCard, UserCircle, AlertCircle, Loader2, Bone, BarChart2,
  LayoutTemplate, ChevronDown, ToggleLeft, CheckSquare, Hash,
  ListFilter, Navigation, ArrowLeftRight, MessageCircle, MessageSquare,
  Bell, Table2, LayoutDashboard,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Nav
// ─────────────────────────────────────────────────────────────────────────────

const NAV = [
  { group: 'Forms', items: [
    { id: 'button',   label: 'Button',   icon: MousePointerClick },
    { id: 'input',    label: 'Input',    icon: TextCursorInput },
    { id: 'textarea', label: 'Textarea', icon: AlignLeft },
    { id: 'checkbox', label: 'Checkbox', icon: CheckSquare },
    { id: 'toggle',   label: 'Toggle',   icon: ToggleLeft },
    { id: 'select',   label: 'Select',   icon: ListFilter },
  ]},
  { group: 'Display', items: [
    { id: 'badge',    label: 'Badge',    icon: TagIcon },
    { id: 'tag',      label: 'Tag',      icon: Hash },
    { id: 'avatar',   label: 'Avatar',   icon: UserCircle },
    { id: 'card',     label: 'Card',     icon: CreditCard },
    { id: 'alert',    label: 'Alert',    icon: AlertCircle },
    { id: 'table',    label: 'Table',    icon: Table2 },
    { id: 'statcard', label: 'Stat Card',icon: LayoutDashboard },
  ]},
  { group: 'Feedback', items: [
    { id: 'spinner',  label: 'Spinner',  icon: Loader2 },
    { id: 'skeleton', label: 'Skeleton', icon: Bone },
    { id: 'progress', label: 'Progress', icon: BarChart2 },
    { id: 'toast',    label: 'Toast',    icon: Bell },
  ]},
  { group: 'Navigation', items: [
    { id: 'tabs',        label: 'Tabs',        icon: LayoutTemplate },
    { id: 'breadcrumb',  label: 'Breadcrumb',  icon: Navigation },
    { id: 'pagination',  label: 'Pagination',  icon: ArrowLeftRight },
    { id: 'accordion',   label: 'Accordion',   icon: ChevronDown },
  ]},
  { group: 'Overlay', items: [
    { id: 'dialog',  label: 'Dialog',  icon: MessageSquare },
    { id: 'tooltip', label: 'Tooltip', icon: MessageCircle },
  ]},
];

// ─────────────────────────────────────────────────────────────────────────────
// Demos
// ─────────────────────────────────────────────────────────────────────────────

function ButtonDemo() {
  return (
    <>
      <div className="demo-section">
        <div className="demo-section-title">Variants</div>
        <div className="demo-row">
          {['primary','secondary','danger','success','ghost','outline'].map(v => (
            <Button key={v} variant={v}>{v.charAt(0).toUpperCase()+v.slice(1)}</Button>
          ))}
        </div>
      </div>
      <div className="demo-section">
        <div className="demo-section-title">Sizes</div>
        <div className="demo-row" style={{ alignItems: 'flex-end' }}>
          {['xs','sm','md','lg','xl'].map(s => (
            <Button key={s} size={s}>Size {s}</Button>
          ))}
        </div>
      </div>
      <div className="demo-section">
        <div className="demo-section-title">States</div>
        <div className="demo-row">
          <Button>Normal</Button>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
          <Button pill>Pill shape</Button>
          <Button variant="outline" pill>Outline pill</Button>
        </div>
      </div>
      <div className="demo-section">
        <div className="demo-section-title">Block</div>
        <Button block>Full width button</Button>
      </div>
    </>
  );
}

function BadgeDemo() {
  return (
    <>
      <div className="demo-section">
        <div className="demo-section-title">Variants</div>
        <div className="demo-row">
          {['default','primary','success','warning','danger','info','outline'].map(v => (
            <Badge key={v} variant={v}>{v}</Badge>
          ))}
        </div>
      </div>
      <div className="demo-section">
        <div className="demo-section-title">Sizes</div>
        <div className="demo-row" style={{ alignItems: 'center' }}>
          <Badge variant="primary" size="sm">Small</Badge>
          <Badge variant="primary">Default</Badge>
          <Badge variant="primary" size="lg">Large</Badge>
        </div>
      </div>
      <div className="demo-section">
        <div className="demo-section-title">Dot badges</div>
        <div className="demo-row">
          {['primary','success','warning','danger'].map(v => (
            <span key={v} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
              <Badge dot variant={v} /> {v}
            </span>
          ))}
        </div>
      </div>
      <div className="demo-section">
        <div className="demo-section-title">With button</div>
        <div className="demo-row">
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 500 }}>
            Notifications <Badge variant="danger">12</Badge>
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 500 }}>
            Messages <Badge variant="primary">3</Badge>
          </button>
        </div>
      </div>
    </>
  );
}

function InputDemo() {
  const [v, setV] = useState('');
  return (
    <>
      <div className="demo-section">
        <div className="demo-section-title">Sizes</div>
        <div className="demo-col" style={{ maxWidth: 400 }}>
          <Input size="sm" placeholder="Small input" />
          <Input size="md" placeholder="Medium input (default)" />
          <Input size="lg" placeholder="Large input" />
        </div>
      </div>
      <div className="demo-section">
        <div className="demo-section-title">With label & hint</div>
        <div style={{ maxWidth: 400 }}>
          <Input
            label="Email address"
            hint="We'll never share your email."
            placeholder="you@example.com"
            type="email"
            value={v}
            onChange={e => setV(e.target.value)}
          />
        </div>
      </div>
      <div className="demo-section">
        <div className="demo-section-title">Error state</div>
        <div style={{ maxWidth: 400 }}>
          <Input label="Username" error="Username is already taken." defaultValue="john_doe" />
        </div>
      </div>
      <div className="demo-section">
        <div className="demo-section-title">Disabled</div>
        <div style={{ maxWidth: 400 }}>
          <Input placeholder="Disabled input" disabled />
        </div>
      </div>
    </>
  );
}

function TextareaDemo() {
  return (
    <>
      <div className="demo-section">
        <div className="demo-section-title">Default</div>
        <div style={{ maxWidth: 400 }}>
          <Textarea label="Message" hint="Max 500 characters." placeholder="Write your message…" rows={4} />
        </div>
      </div>
      <div className="demo-section">
        <div className="demo-section-title">Error state</div>
        <div style={{ maxWidth: 400 }}>
          <Textarea label="Bio" error="Bio is required." rows={3} />
        </div>
      </div>
    </>
  );
}

function CheckboxDemo() {
  const [a, setA] = useState(false);
  const [b, setB] = useState(true);
  const [c, setC] = useState(false);
  return (
    <>
      <div className="demo-section">
        <div className="demo-section-title">States</div>
        <div className="demo-col">
          <Checkbox label="Unchecked" checked={a} onChange={setA} />
          <Checkbox label="Checked" checked={b} onChange={setB} />
          <Checkbox label="Indeterminate" indeterminate />
          <Checkbox label="Disabled" checked={c} onChange={setC} disabled />
        </div>
      </div>
      <div className="demo-section">
        <div className="demo-section-title">Sizes</div>
        <div className="demo-row">
          <Checkbox size="sm" label="Small" checked onChange={() => {}} />
          <Checkbox label="Default" checked onChange={() => {}} />
          <Checkbox size="lg" label="Large" checked onChange={() => {}} />
        </div>
      </div>
    </>
  );
}

function ToggleDemo() {
  const [a, setA] = useState(false);
  const [b, setB] = useState(true);
  return (
    <>
      <div className="demo-section">
        <div className="demo-section-title">States</div>
        <div className="demo-col">
          <Toggle label="Off by default" checked={a} onChange={setA} />
          <Toggle label="On by default" checked={b} onChange={setB} />
          <Toggle label="Disabled" checked={true} disabled />
        </div>
      </div>
      <div className="demo-section">
        <div className="demo-section-title">Sizes</div>
        <div className="demo-row">
          <Toggle size="sm" label="Small" checked onChange={() => {}} />
          <Toggle label="Default" checked onChange={() => {}} />
          <Toggle size="lg" label="Large" checked onChange={() => {}} />
        </div>
      </div>
    </>
  );
}

function SelectDemo() {
  const [v, setV] = useState('');
  const [f, setF] = useState('react');
  const options = [
    { value: 'react',   label: 'React' },
    { value: 'vue',     label: 'Vue' },
    { value: 'svelte',  label: 'Svelte' },
    { value: 'angular', label: 'Angular' },
    { value: 'solid',   label: 'SolidJS' },
  ];
  return (
    <>
      <div className="demo-section">
        <div className="demo-section-title">Uncontrolled</div>
        <div style={{ maxWidth: 300 }}>
          <Select options={options} value={v} onChange={setV} label="Framework" placeholder="Pick one…" />
        </div>
      </div>
      <div className="demo-section">
        <div className="demo-section-title">With preselected value</div>
        <div style={{ maxWidth: 300 }}>
          <Select options={options} value={f} onChange={setF} label="Favorite framework" />
        </div>
      </div>
    </>
  );
}

function AvatarDemo() {
  return (
    <>
      <div className="demo-section">
        <div className="demo-section-title">Sizes</div>
        <div className="demo-row" style={{ alignItems: 'flex-end' }}>
          {['xs','sm','md','lg','xl'].map(s => (
            <Avatar key={s} size={s} initials="AB" />
          ))}
        </div>
      </div>
      <div className="demo-section">
        <div className="demo-section-title">Shapes</div>
        <div className="demo-row">
          <Avatar initials="RO" size="lg" />
          <Avatar initials="RO" size="lg" square />
        </div>
      </div>
      <div className="demo-section">
        <div className="demo-section-title">Status rings</div>
        <div className="demo-row">
          <Avatar initials="ON" size="md" status="online" />
          <Avatar initials="OF" size="md" status="offline" />
        </div>
      </div>
      <div className="demo-section">
        <div className="demo-section-title">Group</div>
        <AvatarGroup>
          {['AB','CD','EF','GH'].map(i => <Avatar key={i} initials={i} size="md" />)}
        </AvatarGroup>
      </div>
    </>
  );
}

function CardDemo() {
  return (
    <>
      <div className="demo-section">
        <div className="demo-section-title">Basic card</div>
        <div style={{ maxWidth: 400 }}>
          <Card>
            <CardHeader>
              <CardTitle>Card title</CardTitle>
              <Badge variant="success">Active</Badge>
            </CardHeader>
            <CardBody>
              <p style={{ fontSize: 14, color: 'var(--c-text-muted)', lineHeight: 1.7 }}>
                This card is built entirely with <span className="code-badge">register.group()</span>.
                No inline styles, no Tailwind class strings in the HTML.
              </p>
            </CardBody>
            <CardFooter>
              <Button size="sm">Save</Button>
              <Button size="sm" variant="ghost">Cancel</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <div className="demo-section">
        <div className="demo-section-title">Profile card</div>
        <div style={{ maxWidth: 340 }}>
          <Card>
            <CardBody>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
                <Avatar initials="JD" size="lg" />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>Jane Doe</div>
                  <div style={{ fontSize: 13, color: 'var(--c-text-muted)' }}>Product Designer</div>
                </div>
              </div>
              <div className="demo-row">
                <Badge variant="primary">UX</Badge>
                <Badge variant="info">Figma</Badge>
                <Badge variant="default">Design Systems</Badge>
              </div>
            </CardBody>
            <CardFooter>
              <Button size="sm" block>View Profile</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}

function AlertDemo() {
  const [alerts, setAlerts] = useState(['info','success','warning','danger']);
  const dismiss = (v) => setAlerts(a => a.filter(x => x !== v));
  return (
    <div className="demo-col" style={{ maxWidth: 560 }}>
      {alerts.map(v => (
        <Alert
          key={v}
          variant={v}
          title={v.charAt(0).toUpperCase() + v.slice(1)}
          onClose={() => dismiss(v)}
        >
          This is a <strong>{v}</strong> alert message. Click × to dismiss.
        </Alert>
      ))}
      {alerts.length < 4 && (
        <Button size="sm" variant="ghost" onClick={() => setAlerts(['info','success','warning','danger'])}>
          Reset alerts
        </Button>
      )}
    </div>
  );
}

function SpinnerDemo() {
  return (
    <>
      <div className="demo-section">
        <div className="demo-section-title">Sizes</div>
        <div className="demo-row" style={{ alignItems: 'center' }}>
          {['xs','sm','md','lg','xl'].map(s => <Spinner key={s} size={s} />)}
        </div>
      </div>
      <div className="demo-section">
        <div className="demo-section-title">Colors</div>
        <div className="demo-row" style={{ alignItems: 'center' }}>
          <Spinner color="primary" />
          <Spinner color="gray" />
          <span style={{ background: 'var(--c-brand)', padding: '8px', borderRadius: '8px', display: 'inline-flex' }}>
            <Spinner color="white" />
          </span>
        </div>
      </div>
    </>
  );
}

function SkeletonDemo() {
  return (
    <>
      <div className="demo-section">
        <div className="demo-section-title">Text lines</div>
        <div style={{ maxWidth: 400 }}>
          <Skeleton variant="title" />
          <Skeleton variant="text" />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="65%" />
        </div>
      </div>
      <div className="demo-section">
        <div className="demo-section-title">Shapes</div>
        <div className="demo-row" style={{ alignItems: 'center' }}>
          <Skeleton variant="avatar" />
          <Skeleton variant="btn" />
          <Skeleton variant="text" width="120px" height="14px" />
        </div>
      </div>
      <div className="demo-section">
        <div className="demo-section-title">Card skeleton</div>
        <div style={{ maxWidth: 360 }}>
          <SkeletonCard />
        </div>
      </div>
    </>
  );
}

function ProgressDemo() {
  return (
    <>
      <div className="demo-section">
        <div className="demo-section-title">Basic</div>
        <div className="demo-col" style={{ maxWidth: 480, gap: '12px' }}>
          <Progress value={30} label="Storage" showValue />
          <Progress value={65} label="Bandwidth" showValue />
          <Progress value={90} label="CPU" showValue />
        </div>
      </div>
      <div className="demo-section">
        <div className="demo-section-title">Variants</div>
        <div className="demo-col" style={{ maxWidth: 480, gap: '12px' }}>
          <Progress value={75} />
          <Progress value={75} variant="success" />
          <Progress value={75} variant="warning" />
          <Progress value={75} variant="danger" />
        </div>
      </div>
      <div className="demo-section">
        <div className="demo-section-title">Striped</div>
        <div style={{ maxWidth: 480 }}>
          <Progress value={55} striped />
        </div>
      </div>
    </>
  );
}

function TabsDemo() {
  return (
    <Tabs
      defaultTab="overview"
      tabs={[
        { id: 'overview', label: 'Overview',  content: (
          <div style={{ fontSize: 14, color: 'var(--c-text-muted)', lineHeight: 1.7 }}>
            <p>This is the <strong>Overview</strong> tab content.</p>
            <p style={{ marginTop: 8 }}>Tabs are built with <span className="code-badge">register.group()</span> for the list, tab, tab-active, and panel slots.</p>
          </div>
        )},
        { id: 'settings', label: 'Settings', content: (
          <div style={{ fontSize: 14, color: 'var(--c-text-muted)' }}>Settings panel content.</div>
        )},
        { id: 'members',  label: 'Members',  content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {['Alice','Bob','Charlie'].map(name => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Avatar initials={name[0]+name[1]} size="sm" />
                <span style={{ fontSize: 14, fontWeight: 500 }}>{name}</span>
                <Badge variant="default" size="sm">Member</Badge>
              </div>
            ))}
          </div>
        )},
        { id: 'billing',  label: 'Billing',  content: (
          <div style={{ fontSize: 14, color: 'var(--c-text-muted)' }}>Billing info goes here.</div>
        )},
      ]}
    />
  );
}

function AccordionDemo() {
  return (
    <div style={{ maxWidth: 560 }}>
      <Accordion
        items={[
          { title: 'What is register() in tailwind-to-style?', content: 'register() lets you define semantic CSS class names once — with Tailwind utilities, raw CSS properties, pseudo shorthands, and modifiers — and reuse them anywhere with plain class names in your HTML.' },
          { title: 'How is this different from Tailwind CSS?', content: 'Tailwind requires long class strings directly in HTML. register() lets you define those classes once and use short, meaningful names like btn btn-primary everywhere, similar to Bootstrap but with Tailwind power.' },
          { title: 'Does it need a build step?', content: 'No. tailwind-to-style is a zero-build runtime engine. Import it, call register(), and CSS is injected directly into a <style> tag in the browser.' },
          { title: 'Can I use it with React, Vue, or Svelte?', content: 'Yes. register() is framework-agnostic. It works anywhere JavaScript runs — React, Vue, Svelte, vanilla HTML, or Node.js for SSR.' },
        ]}
      />
    </div>
  );
}

function TagDemo() {
  const [tags, setTags] = useState(['Design', 'React', 'CSS', 'TypeScript']);
  return (
    <>
      <div className="demo-section">
        <div className="demo-section-title">Variants</div>
        <div className="demo-row">
          <Tag>Default</Tag>
          {['primary','success','warning','danger'].map(v => (
            <Tag key={v} variant={v}>{v}</Tag>
          ))}
        </div>
      </div>
      <div className="demo-section">
        <div className="demo-section-title">Removable</div>
        <div className="demo-row">
          {tags.map(t => (
            <Tag key={t} variant="primary" onRemove={() => setTags(ts => ts.filter(x => x !== t))}>
              {t}
            </Tag>
          ))}
          {tags.length === 0 && (
            <Button size="xs" variant="ghost" onClick={() => setTags(['Design','React','CSS','TypeScript'])}>
              Reset
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

function BreadcrumbDemo() {
  return (
    <>
      <div className="demo-section">
        <div className="demo-section-title">Basic</div>
        <Breadcrumb items={[
          { label: 'Home', href: '#' },
          { label: 'Components', href: '#' },
          { label: 'Breadcrumb' },
        ]} />
      </div>
      <div className="demo-section">
        <div className="demo-section-title">Longer path</div>
        <Breadcrumb items={[
          { label: 'Dashboard', href: '#' },
          { label: 'Settings', href: '#' },
          { label: 'Team', href: '#' },
          { label: 'Members', href: '#' },
          { label: 'Jane Doe' },
        ]} />
      </div>
    </>
  );
}

function PaginationDemo() {
  const [page, setPage] = useState(1);
  return (
    <>
      <div className="demo-section">
        <div className="demo-section-title">Default (page {page} of 10)</div>
        <Pagination page={page} total={100} pageSize={10} onChange={setPage} />
      </div>
      <div className="demo-section">
        <div className="demo-section-title">Large dataset</div>
        <Pagination page={7} total={500} pageSize={10} onChange={() => {}} />
      </div>
    </>
  );
}

function TooltipDemo() {
  return (
    <>
      <div className="demo-section">
        <div className="demo-section-title">Placements</div>
        <div className="demo-row" style={{ paddingTop: 24, paddingBottom: 24 }}>
          {['top','bottom','left','right'].map(p => (
            <Tooltip key={p} content={`Tooltip on ${p}`} placement={p}>
              <Button variant="secondary" size="sm">{p}</Button>
            </Tooltip>
          ))}
        </div>
      </div>
      <div className="demo-section">
        <div className="demo-section-title">On icon</div>
        <div className="demo-row">
          <Tooltip content="Delete item" placement="top">
            <IconButton icon={<span>🗑</span>} variant="ghost" size="md" />
          </Tooltip>
          <Tooltip content="Share with team" placement="top">
            <IconButton icon={<span>↗</span>} variant="ghost" size="md" />
          </Tooltip>
        </div>
      </div>
    </>
  );
}

function DialogDemo() {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  return (
    <>
      <div className="demo-section">
        <div className="demo-section-title">Basic dialog</div>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title="Edit profile"
          footer={
            <>
              <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
              <Button size="sm" onClick={() => setOpen(false)}>Save changes</Button>
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Input label="Display name" defaultValue="Jane Doe" />
            <Input label="Email" type="email" defaultValue="jane@example.com" />
            <Textarea label="Bio" rows={3} placeholder="Tell us about yourself…" />
          </div>
        </Dialog>
      </div>
      <div className="demo-section">
        <div className="demo-section-title">Confirmation dialog</div>
        <Button variant="danger" size="sm" onClick={() => setConfirm(true)}>Delete account</Button>
        <Dialog
          open={confirm}
          onClose={() => setConfirm(false)}
          title="Delete account?"
          footer={
            <>
              <Button variant="ghost" size="sm" onClick={() => setConfirm(false)}>Cancel</Button>
              <Button variant="danger" size="sm" onClick={() => setConfirm(false)}>Yes, delete</Button>
            </>
          }
        >
          This action cannot be undone. All your data will be permanently deleted.
        </Dialog>
      </div>
    </>
  );
}

function ToastDemo({ onToast }) {
  return (
    <>
      <div className="demo-section">
        <div className="demo-section-title">Trigger toasts</div>
        <div className="demo-row">
          {[
            { variant: 'info',    title: 'Info',    desc: 'Here is some helpful information.' },
            { variant: 'success', title: 'Success', desc: 'Your changes have been saved.' },
            { variant: 'warning', title: 'Warning', desc: 'Please review before continuing.' },
            { variant: 'danger',  title: 'Error',   desc: 'Something went wrong.' },
          ].map(t => (
            <Button key={t.variant} variant="secondary" size="sm" onClick={() => onToast(t)}>
              {t.title} toast
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}

function TableDemo() {
  const columns = [
    { key: 'name',   header: 'Name',   render: r => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar initials={r.name[0]+r.name[1]} size="sm" />
        <span style={{ fontWeight: 500 }}>{r.name}</span>
      </div>
    )},
    { key: 'role',   header: 'Role' },
    { key: 'status', header: 'Status', render: r => (
      <Badge variant={r.status === 'Active' ? 'success' : r.status === 'Pending' ? 'warning' : 'default'}>
        {r.status}
      </Badge>
    )},
    { key: 'joined', header: 'Joined' },
    { key: 'action', header: '', render: () => <Button size="xs" variant="ghost">Edit</Button> },
  ];
  const rows = [
    { name: 'Alice Johnson',  role: 'Designer',         status: 'Active',   joined: 'Jan 2024' },
    { name: 'Bob Smith',      role: 'Engineer',         status: 'Active',   joined: 'Mar 2024' },
    { name: 'Carol Williams', role: 'Product Manager',  status: 'Pending',  joined: 'Jun 2024' },
    { name: 'Dave Brown',     role: 'Engineer',         status: 'Inactive', joined: 'Aug 2024' },
    { name: 'Eve Davis',      role: 'Designer',         status: 'Active',   joined: 'Sep 2024' },
  ];
  return <Table columns={columns} rows={rows} />;
}

function StatCardDemo() {
  const stats = [
    { label: 'Total revenue',   value: '$84,250', change: '+12.5%', up: true },
    { label: 'Active users',    value: '24,813',  change: '+8.2%',  up: true },
    { label: 'Bounce rate',     value: '42.1%',   change: '-3.4%',  up: false },
    { label: 'Avg. session',    value: '3m 42s',  change: '+0.8%',  up: true },
  ];
  return (
    <div className="demo-grid">
      {stats.map(s => (
        <div key={s.label} className="stat-card">
          <div className="stat-label">{s.label}</div>
          <div className="stat-value">{s.value}</div>
          <div className={cx('stat-change', s.up ? 'stat-change-up' : 'stat-change-down')}>
            {s.up ? '↑' : '↓'} {s.change} vs last month
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// App
// ─────────────────────────────────────────────────────────────────────────────

const DEMO_MAP = {
  button:     { title: 'Button',     desc: 'Trigger actions. Supports 6 variants, 5 sizes, loading, disabled, pill, block, and icon buttons.',    component: ButtonDemo },
  badge:      { title: 'Badge',      desc: 'Small label for status, counts, or categorisation.',                                                  component: BadgeDemo },
  input:      { title: 'Input',      desc: 'Text input with label, hint, error, and size variants.',                                              component: InputDemo },
  textarea:   { title: 'Textarea',   desc: 'Multi-line text input with label, hint, and error state.',                                            component: TextareaDemo },
  checkbox:   { title: 'Checkbox',   desc: 'Binary selection with checked, indeterminate, and disabled states.',                                  component: CheckboxDemo },
  toggle:     { title: 'Toggle',     desc: 'Boolean switch with three sizes.',                                                                    component: ToggleDemo },
  select:     { title: 'Select',     desc: 'Custom dropdown selector with click-outside close.',                                                  component: SelectDemo },
  avatar:     { title: 'Avatar',     desc: 'User representation with initials, image, status ring, and group stacking.',                          component: AvatarDemo },
  card:       { title: 'Card',       desc: 'Container with header, body, and footer slots via register.group().',                                 component: CardDemo },
  alert:      { title: 'Alert',      desc: 'Contextual feedback messages. Four variants with optional title and dismiss.',                        component: AlertDemo },
  tag:        { title: 'Tag',        desc: 'Compact label with optional color variants and removable button.',                                    component: TagDemo },
  table:      { title: 'Table',      desc: 'Data table with typed columns, custom cell renderers, and empty state.',                              component: TableDemo },
  statcard:   { title: 'Stat Card',  desc: 'KPI metric display with label, value, and delta indicator.',                                         component: StatCardDemo },
  spinner:    { title: 'Spinner',    desc: 'Loading indicator. Five sizes, three colors.',                                                        component: SpinnerDemo },
  skeleton:   { title: 'Skeleton',   desc: 'Placeholder for loading content. Text, title, avatar, button, and card variants.',                    component: SkeletonDemo },
  progress:   { title: 'Progress',   desc: 'Linear progress bar with label, value, variants, and striped mode.',                                  component: ProgressDemo },
  toast:      { title: 'Toast',      desc: 'Non-blocking notifications. Four variants, auto-dismiss after 4 seconds.',                            component: null },
  tabs:       { title: 'Tabs',       desc: 'Switch between views. Active indicator with smooth underline transition.',                            component: TabsDemo },
  breadcrumb: { title: 'Breadcrumb', desc: 'Hierarchical navigation path.',                                                                       component: BreadcrumbDemo },
  pagination: { title: 'Pagination', desc: 'Page navigation with ellipsis for large datasets.',                                                   component: PaginationDemo },
  accordion:  { title: 'Accordion',  desc: 'Collapsible content panels. Single-open mode.',                                                       component: AccordionDemo },
  dialog:     { title: 'Dialog',     desc: 'Modal overlay with header, body, footer, and backdrop-close.',                                        component: DialogDemo },
  tooltip:    { title: 'Tooltip',    desc: 'Contextual label on hover. Four placement options.',                                                  component: TooltipDemo },
};

export default function App() {
  const [active, setActive] = useState('button');
  const { toasts, add, remove } = useToast();

  const demo = DEMO_MAP[active];
  const DemoComponent = demo?.component;

  return (
    <div className="app-shell">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span style={{ color: 'var(--c-brand)' }}>◆</span> register()
        </div>
        {NAV.map(group => (
          <div key={group.group}>
            <span className="sidebar-group-label">{group.group}</span>
            {group.items.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className={active === item.id ? 'sidebar-item-active' : 'sidebar-item'}
                >
                  <Icon size={15} />
                  {item.label}
                </button>
              );
            })}
          </div>
        ))}
      </aside>

      {/* Content */}
      <main className="main-content">
        {demo && (
          <>
            <div className="demo-header">
              <h1 className="demo-title">{demo.title}</h1>
              <p className="demo-desc">{demo.desc}</p>
            </div>
            {active === 'toast'
              ? <ToastDemo onToast={add} />
              : DemoComponent && <DemoComponent />
            }
          </>
        )}
      </main>

      {/* Toast portal */}
      <ToastContainer toasts={toasts} onRemove={remove} />
    </div>
  );
}
