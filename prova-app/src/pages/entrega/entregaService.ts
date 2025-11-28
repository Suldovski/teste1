const BASE = "http://localhost:5000/api/entrega";

export type Entrega = {
  id?: number;
  produto: string;
  endereco: string;
  status?: string;
};

export async function cadastrarEntrega(entrega: Pick<Entrega, 'produto'|'endereco'>) {
  const res = await fetch(`${BASE}/cadastrar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entrega),
  });
  if (!res.ok) throw new Error('Erro ao cadastrar');
  return await res.json();
}

export async function listarEntregas() {
  const res = await fetch(`${BASE}/listar`);
  if (!res.ok) throw new Error('Erro ao listar');
  return await res.json();
}

export async function alterarStatus(id: number) {
  const res = await fetch(`${BASE}/alterar`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) throw new Error('Erro ao alterar status');
  return await res.json();
}

export async function listarPendentes() {
  const res = await fetch(`${BASE}/pendentes`);
  if (!res.ok) throw new Error('Erro ao listar pendentes');
  return await res.json();
}

export async function listarConcluidas() {
  const res = await fetch(`${BASE}/concluidas`);
  if (!res.ok) throw new Error('Erro ao listar concluidas');
  return await res.json();
}
