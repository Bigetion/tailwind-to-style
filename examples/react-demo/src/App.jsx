import React from 'react';
import { twsxClassName } from 'tailwind-to-style';
import { SkeletonDemo } from './demos/SkeletonDemo';

// Layout styles
const page = twsxClassName({ name: 'page', _: 'min-h-screen bg-gray-50 p-8' });
const container = twsxClassName({ name: 'container', _: 'max-w-4xl mx-auto' });
const title = twsxClassName({ name: 'title', _: 'text-3xl font-bold text-gray-900 mb-2' });
const subtitle = twsxClassName({ name: 'subtitle', _: 'text-gray-500 mb-8' });

export default function App() {
  return (
    <div className={page}>
      <div className={container}>
        <h1 className={title}>tailwind-to-style — React Components</h1>
        <p className={subtitle}>Visual testing: Skeleton component</p>
        <SkeletonDemo />
      </div>
    </div>
  );
}
