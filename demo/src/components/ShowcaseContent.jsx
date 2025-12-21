import React from 'react'
import { useTwsx } from 'twsx-react'
import BasicUsageShowcase from '../showcases/BasicUsageShowcase'
import ReactHooksShowcase from '../showcases/ReactHooksShowcase'
import AnimationsShowcase from '../showcases/AnimationsShowcase'
import AspectRatioShowcase from '../showcases/AspectRatioShowcase'
import ColumnsShowcase from '../showcases/ColumnsShowcase'
import BoxDecorationBreakShowcase from '../showcases/BoxDecorationBreakShowcase'
import ComponentsShowcase from '../showcases/ComponentsShowcase'
import PerformanceShowcase from '../showcases/PerformanceShowcase'

const showcases = {
  'basic-usage': BasicUsageShowcase,
  'react-hooks': ReactHooksShowcase,
  'animations': AnimationsShowcase,
  'aspect-ratio': AspectRatioShowcase,
  'columns': ColumnsShowcase,
  'box-decoration-break': BoxDecorationBreakShowcase,
  'components': ComponentsShowcase,
  'performance': PerformanceShowcase
}

export default function ShowcaseContent({ activeItem }) {
  useTwsx({
    '.showcase-content': [
      'flex-1 overflow-y-auto',
      {
        '.content-wrapper': 'max-w-4xl mx-auto p-8'
      }
    ]
  })

  const ActiveShowcase = showcases[activeItem] || BasicUsageShowcase

  return (
    <div className="showcase-content">
      <div className="content-wrapper">
        <ActiveShowcase />
      </div>
    </div>
  )
}