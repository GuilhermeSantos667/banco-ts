import { Request, Response } from "express";
const express = require('express');
const { knex } = require('./db');
const { Pessoa } = require('./Pessoa');
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const app = express();
app.use(express.json());

const cadastro = async (req: Request, res: Response) => {
  const { nome, cpf, email, senha, numero } = req.body;
  if (!nome || !cpf || !email || !senha || !numero) {
    return res.status(400).json({ mensagem: 'Parâmetros inválidos!' });
  }

  try {
    console.log(senha);

    
    const novaPessoa = new Pessoa(nome, cpf, email, senha, numero);
    const hashPassword: string = await bcrypt.hash(senha, 10);
    
    const query = await knex('usuarios').insert({
      nome: novaPessoa.nome,
      cpf: novaPessoa.cpf,
      email: novaPessoa.email,
      senha: hashPassword,
      numero: novaPessoa.numero
    });

    return res.status(200).json({ mensagem: 'Usuário cadastrado' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};
const login = async (req: Request, res: Response) => {
    const { cpf, email, senha } = req.body;

    try {
        const usuario = await knex("usuarios").where({ cpf, email }).first(); 

        if (!usuario) {
            return res.status(400).json({ message: "Usuário não identificado, revise os campos informados" });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(400).json({ message: "Senha inválida!" });
        }

        const token = jwt.sign({ id: usuario.id }, process.env.HASH ?? "", { expiresIn: 8 });
        const { senha: _, numero:__, ...usuarioLogin } = usuario;
        return res.status(200).json({ user: usuarioLogin, token: token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
};


app.post('/cadastro', cadastro);
app.post('/login', login);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
