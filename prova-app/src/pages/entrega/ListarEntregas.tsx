import React, { useEffect, useState } from 'react';
import { listarEntregas, alterarStatus, Entrega } from './entregaService';

export default function ListarEntregas() {
  const [entregas, setEntregas] = useState<Entrega[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');

  async function fetchData() {
    setLoading(true);
    setMsg('');
    try {
      const data = await listarEntregas();
      setEntregas(data);
    } catch {
      setMsg('Erro ao carregar entregas.');
    }
    setLoading(false);
  }

  useEffect(() => { fetchData(); }, []);

  async function handleAlterar(id: number) {
    setMsg('');
    try {
      await alterarStatus(id);
      setMsg('Status alterado!');
      fetchData();
    } catch {
      setMsg('Erro ao alterar status.');
    }
  }

  return (
    <div>
      <h2>Listar Entregas</h2>
      {msg && <p>{msg}</p>}
      {loading ? <p>Carregando...</p> : (
        <table border={1}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Produto</th>
              <th>Endereço</th>
              <th>Status</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {entregas.map(e => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.produto}</td>
                <td>{e.endereco}</td>
                <td>{e.status}</td>
                <td>
                  {e.status !== 'Entregue' && (
                    <button onClick={() => handleAlterar(e.id!)}>Avançar Status</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
