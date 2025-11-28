import React, { useEffect, useState } from 'react';
import { listarPendentes, Entrega } from './entregaService';

export default function Pendentes() {
  const [entregas, setEntregas] = useState<Entrega[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    setLoading(true);
    setMsg('');
    listarPendentes()
      .then(data => setEntregas(data))
      .catch(() => setMsg('Erro ao carregar entregas.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2>Entregas Pendentes/Em Rota</h2>
      {msg && <p>{msg}</p>}
      {loading ? <p>Carregando...</p> : (
        <table border={1}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Produto</th>
              <th>Endereço</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {entregas.map(e => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.produto}</td>
                <td>{e.endereco}</td>
                <td>{e.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
