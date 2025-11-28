-- Script de criação da tabela de entregas
-- Nome do arquivo do DB deve conter o aluno: DB_LuanSuldovski.db

CREATE TABLE IF NOT EXISTS Entregas (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Produto TEXT NOT NULL,
    Endereco TEXT NOT NULL,
    Status TEXT NOT NULL
);
