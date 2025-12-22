import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ButtonShowcase from './ButtonShowcase.jsx'
import './index.css'
import '../../preflight.css'
import { TwsxProvider } from 'tailwind-to-style/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TwsxProvider>
      <ButtonShowcase />
    </TwsxProvider>
  </React.StrictMode>,
)