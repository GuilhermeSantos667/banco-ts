"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Banco = void 0;
class Banco {
    constructor(saldo) {
        this.saldo = 0;
        this.saldo = saldo;
    }
    depositar(valor) {
        this.saldo += valor;
        return `valor depositado ${valor}`;
    }
    sacar(valor) {
        if (valor > this.saldo) {
            return `valor indisponivel para saque! valor em saldo ${this.saldo}`;
        }
        else {
            this.saldo -= valor;
        }
        return `valor sacado ${valor}`;
    }
    verificarSaldo() {
        return `saldo em conta ${this.saldo}`;
    }
}
exports.Banco = Banco;
