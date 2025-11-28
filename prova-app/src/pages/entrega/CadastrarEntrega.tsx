import React, { useState } from 'react';
import { cadastrarEntrega } from './entregaService';

export default function CadastrarEntrega() {
  const [produto, setProduto] = useState('');
  const [endereco, setEndereco] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      await cadastrarEntrega({ produto, endereco });
      setMsg('Entrega cadastrada com sucesso!');
      setProduto('');
      setEndereco('');
    } catch {
      setMsg('Erro ao cadastrar entrega.');
    }
    setLoading(false);
  }

  return (
    <div>
      <h2>Cadastrar Entrega</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Produto:</label>
          <input value={produto} onChange={e => setProduto(e.target.value)} required />
        </div>
        <div>
          <label>Endereço:</label>
          <input value={endereco} onChange={e => setEndereco(e.target.value)} required />
        </div>
        <button type="submit" disabled={loading}>Cadastrar</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
