import { useState } from 'react'
import './App.css'
import Login from "./pages/Login.jsx"
import Home from "./pages/Home.jsx"
import Reservas from "./pages/Reservas.jsx"
import { Routes, Route } from 'react-router-dom'
import { ReservaProvider } from './contexts/ReservaContext.jsx'

function App() {
  return (
    <div>
    <main className="main-content">
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Reservas" element={<Reservas />} />
      </Routes>
    </main>
    </div>
  )
}

export default App
