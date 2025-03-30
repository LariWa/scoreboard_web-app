import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import ScoreboardApp  from './ScoreboardApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ScoreboardApp />
  </StrictMode>,
)
