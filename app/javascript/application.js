// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails

// Entry point for the build script in your package.json
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App'

import Login from './components/Login'
import LifetimeStats from './components/LifetimeStats'
import Badges from './components/Badges'
import TimeSeriesBarChart from './components/TimeSeriesBarChart'
import Friends from './components/Friends'
import dummyData from './components/dummyData'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('root')
  if (container) {
    const root = createRoot(container)
    root.render(<App />)
  }
})
