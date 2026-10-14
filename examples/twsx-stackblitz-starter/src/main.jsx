import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../../preflight.css';
import { App } from './App.jsx';

const root = document.getElementById('root');
createRoot(root).render(<App />);
