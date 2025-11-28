import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MenuEntregas from './MenuEntregas';
import CadastrarEntrega from './CadastrarEntrega';
import ListarEntregas from './ListarEntregas';
import Pendentes from './Pendentes';
import Concluidas from './Concluidas';

export default function EntregaRoutes() {
  return (
    <div>
      <MenuEntregas />
      <Routes>
        <Route path="cadastrar" element={<CadastrarEntrega />} />
        <Route path="listar" element={<ListarEntregas />} />
        <Route path="pendentes" element={<Pendentes />} />
        <Route path="concluidas" element={<Concluidas />} />
        <Route path="*" element={<Navigate to="listar" />} />
      </Routes>
    </div>
  );
}
