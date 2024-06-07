"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const { knex } = require('./db');
const { Pessoa } = require('./Pessoa');
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app = express();
app.use(express.json());
const cadastro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, cpf, email, senha, numero } = req.body;
    if (!nome || !cpf || !email || !senha || !numero) {
        return res.status(400).json({ mensagem: 'Parâmetros inválidos!' });
    }
    try {
        console.log(senha);
        const novaPessoa = new Pessoa(nome, cpf, email, senha, numero);
        const hashPassword = yield bcrypt_1.default.hash(senha, 10);
        const query = yield knex('usuarios').insert({
            nome: novaPessoa.nome,
            cpf: novaPessoa.cpf,
            email: novaPessoa.email,
            senha: hashPassword,
            numero: novaPessoa.numero
        });
        return res.status(200).json({ mensagem: 'Usuário cadastrado' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { cpf, email, senha } = req.body;
    try {
        const usuario = yield knex("usuarios").where({ cpf, email }).first();
        if (!usuario) {
            return res.status(400).json({ message: "Usuário não identificado, revise os campos informados" });
        }
        const senhaValida = yield bcrypt_1.default.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(400).json({ message: "Senha inválida!" });
        }
        const token = jsonwebtoken_1.default.sign({ id: usuario.id }, (_a = process.env.HASH) !== null && _a !== void 0 ? _a : "", { expiresIn: 8 });
        const { senha: _, numero: __ } = usuario, usuarioLogin = __rest(usuario, ["senha", "numero"]);
        return res.status(200).json({ user: usuarioLogin, token: token });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
});
app.post('/cadastro', cadastro);
app.post('/login', login);
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
