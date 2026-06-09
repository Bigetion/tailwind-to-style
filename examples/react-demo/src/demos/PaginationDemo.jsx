import React, { useState } from 'react';
import { twsxClassName } from 'tailwind-to-style';
import { Pagination } from '../components/Pagination';
import { Table } from '../components/Table';
import { Badge } from '../components/Badge';

const section = twsxClassName({ name: 'demo-section', _: 'mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm' });
const sectionTitle = twsxClassName({ name: 'demo-title', _: 'text-xl font-semibold text-gray-900 mb-4' });
const label = twsxClassName({ name: 'demo-label', _: 'text-sm text-gray-500 mb-3 font-medium' });

const allRows = Array.from({ length: 47 }, (_, i) => ({
  id: i + 1,
  name: ['Alice Johnson', 'Bob Smith', 'Carol White', 'David Lee', 'Emily Chen', 'Frank Brown', 'Grace Kim'][i % 7],
  email: `user${i + 1}@example.com`,
  status: ['active', 'active', 'inactive', 'active', 'pending'][i % 5],
}));

const PAGE_SIZE = 8;

export function PaginationDemo() {
  const [page, setPage] = useState(1);
  const [page2, setPage2] = useState(3);
  const [page3, setPage3] = useState(1);

  const paginatedRows = allRows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(allRows.length / PAGE_SIZE);

  return (
    <div>
      {/* Color Schemes */}
      <div className={section}>
        <h2 className={sectionTitle}>Pagination — Color Schemes</h2>
        <p className={label}>Four visual variants</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '8px' }}>Blue (default)</p>
            <Pagination current={3} total={8} onChange={() => {}} colorScheme="blue" />
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '8px' }}>Outline</p>
            <Pagination current={3} total={8} onChange={() => {}} colorScheme="outline" />
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '8px' }}>Minimal</p>
            <Pagination current={3} total={8} onChange={() => {}} colorScheme="minimal" />
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '8px' }}>Rounded</p>
            <Pagination current={3} total={8} onChange={() => {}} colorScheme="rounded" />
          </div>
        </div>
      </div>

      {/* Basic */}
      <div className={section}>
        <h2 className={sectionTitle}>Pagination — Interactive</h2>
        <p className={label}>Click pages to navigate</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '8px' }}>5 pages</p>
            <Pagination current={page3} total={5} onChange={setPage3} />
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '8px' }}>10 pages — current: {page2}</p>
            <Pagination current={page2} total={10} onChange={setPage2} colorScheme="outline" />
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '8px' }}>50 pages (smart ellipsis)</p>
            <Pagination current={page} total={50} onChange={setPage} colorScheme="minimal" />
          </div>
        </div>
      </div>

      {/* Sizes */}
      <div className={section}>
        <h2 className={sectionTitle}>Pagination — Sizes</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '8px' }}>Small</p>
            <Pagination current={3} total={8} onChange={() => {}} size="sm" />
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '8px' }}>Medium (default)</p>
            <Pagination current={3} total={8} onChange={() => {}} size="md" />
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '8px' }}>Large</p>
            <Pagination current={3} total={8} onChange={() => {}} size="lg" />
          </div>
        </div>
      </div>

      {/* With Table */}
      <div className={section}>
        <h2 className={sectionTitle}>Pagination — With Table</h2>
        <p className={label}>Realistic paginated data table ({allRows.length} rows, {PAGE_SIZE} per page)</p>
        <Table
          columns={[
            { key: 'id', label: '#', width: '48px', render: v => <span style={{ color: '#9ca3af', fontFamily: 'monospace', fontSize: '0.8rem' }}>{v}</span> },
            { key: 'name', label: 'Name' },
            { key: 'email', label: 'Email' },
            { key: 'status', label: 'Status', render: v => <Badge color={v === 'active' ? 'green' : v === 'pending' ? 'yellow' : 'gray'} size="sm" dot>{v}</Badge> },
          ]}
          data={paginatedRows}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
          <p style={{ fontSize: '0.8rem', color: '#6b7280' }}>
            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, allRows.length)} of {allRows.length} results
          </p>
          <Pagination current={page} total={totalPages} onChange={setPage} size="sm" colorScheme="outline" />
        </div>
      </div>
    </div>
  );
}
