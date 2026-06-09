import React from 'react';
import { tw } from 'tailwind-to-style';
import { SpinnerDemo } from './demos/SpinnerDemo';

const page = tw({ name: 'page', _: 'min-h-screen bg-gray-50 p-8' });
const container = tw({ name: 'container', _: 'max-w-4xl mx-auto' });
const title = tw({ name: 'title', _: 'text-3xl font-bold text-gray-900 mb-2' });
const subtitle = tw({ name: 'subtitle', _: 'text-gray-500 mb-8' });

export default function App() {
  return (
    <div className={page}>
      <div className={container}>
        <h1 className={title}>tailwind-to-style — React Components</h1>
        <p className={subtitle}>Visual testing: Spinner component</p>
        <SpinnerDemo />
      </div>
    </div>
  );
}
