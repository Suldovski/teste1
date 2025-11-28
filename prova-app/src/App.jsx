import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


import { Routes, Route, Navigate } from 'react-router-dom';
import EntregaRoutes from './pages/entrega';

function App() {
  return (
    <div>
      <h1>Rastreamento de Entregas</h1>
      <Routes>
        <Route path="/entrega/*" element={<EntregaRoutes />} />
        <Route path="*" element={<Navigate to="/entrega/listar" />} />
      </Routes>
    </div>
  );
}

export default App
