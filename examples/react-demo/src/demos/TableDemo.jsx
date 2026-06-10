import React from 'react';
import { tw } from 'tailwind-to-style';
import { Table } from '../components/Table';
import { Badge } from '../components/Badge';
import { Avatar } from '../components/Avatar';
import { MoreHorizontal } from 'lucide-react';

const section = tw({ name: 'demo-section', _: 'mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm' });
const sectionTitle = tw({ name: 'demo-title', _: 'text-xl font-semibold text-gray-900 mb-4' });
const label = tw({ name: 'demo-label', _: 'text-sm text-gray-500 mb-3 font-medium' });

const users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'active', avatar: 'https://i.pravatar.cc/40?img=1' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'active', avatar: 'https://i.pravatar.cc/40?img=2' },
  { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'inactive', avatar: 'https://i.pravatar.cc/40?img=3' },
  { id: 4, name: 'David Lee', email: 'david@example.com', role: 'Editor', status: 'active', avatar: 'https://i.pravatar.cc/40?img=4' },
  { id: 5, name: 'Emily Chen', email: 'emily@example.com', role: 'Admin', status: 'pending', avatar: 'https://i.pravatar.cc/40?img=5' },
];

const orders = [
  { id: '#ORD-001', product: 'Wireless Headphones', amount: '$89.99', date: 'Jun 1, 2026', status: 'delivered' },
  { id: '#ORD-002', product: 'USB-C Hub', amount: '$49.99', date: 'Jun 3, 2026', status: 'shipped' },
  { id: '#ORD-003', product: 'Mechanical Keyboard', amount: '$149.99', date: 'Jun 5, 2026', status: 'processing' },
  { id: '#ORD-004', product: 'Monitor Stand', amount: '$39.99', date: 'Jun 7, 2026', status: 'cancelled' },
  { id: '#ORD-005', product: 'Webcam HD', amount: '$69.99', date: 'Jun 8, 2026', status: 'delivered' },
];

const statusColors = {
  active: 'green',
  inactive: 'gray',
  pending: 'yellow',
  delivered: 'green',
  shipped: 'blue',
  processing: 'yellow',
  cancelled: 'red',
};

export function TableDemo() {
  return (
    <div>
      {/* Slots + Variants showcase */}
      <div className={section}>
        <h2 className={sectionTitle}>Table — Variants (slots + variants)</h2>
        <p className={label}>variant and density each affect multiple slots at once — thead, tr, th, td all update together</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <p style={{ fontSize: '0.7rem', color: '#9ca3af', marginBottom: '6px' }}>variant="default" + density="default"</p>
            <Table variant="default" density="default" columns={[{ key: 'id', label: 'ID' }, { key: 'product', label: 'Product' }, { key: 'amount', label: 'Amount' }]} data={orders.slice(0, 3)} />
          </div>
          <div>
            <p style={{ fontSize: '0.7rem', color: '#9ca3af', marginBottom: '6px' }}>variant="striped" + density="compact"</p>
            <Table variant="striped" density="compact" columns={[{ key: 'id', label: 'ID' }, { key: 'product', label: 'Product' }, { key: 'amount', label: 'Amount' }]} data={orders.slice(0, 3)} />
          </div>
          <div>
            <p style={{ fontSize: '0.7rem', color: '#9ca3af', marginBottom: '6px' }}>variant="bordered" + density="comfortable"</p>
            <Table variant="bordered" density="comfortable" columns={[{ key: 'id', label: 'ID' }, { key: 'product', label: 'Product' }, { key: 'amount', label: 'Amount' }]} data={orders.slice(0, 3)} />
          </div>
        </div>
      </div>

      {/* Basic Table */}
      <div className={section}>
        <h2 className={sectionTitle}>Table — Users</h2>
        <p className={label}>Table with avatars, badges, and custom cell renderers</p>
        <Table
          columns={[
            {
              key: 'name',
              label: 'User',
              render: (val, row) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Avatar size="sm" src={row.avatar} name={row.name} />
                  <div>
                    <p style={{ fontWeight: 500, color: '#111827' }}>{row.name}</p>
                    <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{row.email}</p>
                  </div>
                </div>
              ),
            },
            { key: 'role', label: 'Role' },
            {
              key: 'status',
              label: 'Status',
              render: (val) => (
                <Badge color={statusColors[val]} size="sm" dot>{val}</Badge>
              ),
            },
            {
              key: 'actions',
              label: '',
              width: '40px',
              render: () => (
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}>
                  <MoreHorizontal size={16} />
                </button>
              ),
            },
          ]}
          data={users}
        />
      </div>

      {/* Orders Table */}
      <div className={section}>
        <h2 className={sectionTitle}>Table — Orders</h2>
        <p className={label}>Striped rows with order data</p>
        <Table
          striped
          columns={[
            { key: 'id', label: 'Order ID', render: (val) => <span style={{ fontWeight: 500, fontFamily: 'monospace', fontSize: '0.8rem' }}>{val}</span> },
            { key: 'product', label: 'Product' },
            { key: 'amount', label: 'Amount', render: (val) => <span style={{ fontWeight: 600 }}>{val}</span> },
            { key: 'date', label: 'Date' },
            {
              key: 'status',
              label: 'Status',
              render: (val) => <Badge color={statusColors[val]} size="sm">{val}</Badge>,
            },
          ]}
          data={orders}
        />
      </div>

      {/* Compact Table */}
      <div className={section}>
        <h2 className={sectionTitle}>Table — Compact</h2>
        <p className={label}>Reduced padding for dense data</p>
        <Table
          compact
          columns={[
            { key: 'id', label: 'ID' },
            { key: 'product', label: 'Item' },
            { key: 'amount', label: 'Price' },
            { key: 'status', label: 'Status', render: (val) => <Badge color={statusColors[val]} size="sm">{val}</Badge> },
          ]}
          data={orders}
        />
      </div>
    </div>
  );
}
