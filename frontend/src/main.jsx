import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import WaitlessApp from './waitless/WaitlessApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WaitlessApp />
  </StrictMode>,
)
