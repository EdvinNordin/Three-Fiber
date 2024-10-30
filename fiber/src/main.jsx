import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas } from "@react-three/fiber";
import './index.css'
import Scene from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <Scene />
  </StrictMode>,
)
