import React from 'react';
import { Link } from 'react-router-dom';

export default function MenuEntregas() {
  return (
    <nav style={{ marginBottom: 20 }}>
      <Link to="/entrega/cadastrar">Cadastrar</Link> |{' '}
      <Link to="/entrega/listar">Listar</Link> |{' '}
      <Link to="/entrega/pendentes">Pendentes</Link> |{' '}
      <Link to="/entrega/concluidas">Concluídas</Link>
    </nav>
  );
}
