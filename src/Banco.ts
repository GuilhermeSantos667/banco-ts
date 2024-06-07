export class Banco {
  saldo: number = 0;

  constructor(saldo: number) {
      this.saldo = saldo;
  }

  depositar(valor:number):String{
    this.saldo += valor;
    return `valor depositado ${valor}`
  }
  sacar(valor:number):String{
    if(valor > this.saldo){
      return `valor indisponivel para saque! valor em saldo ${this.saldo}`
    }
    else{
      this.saldo -= valor;
    }
    return `valor sacado ${valor}`
  }

  
  verificarSaldo():String{
    return `saldo em conta ${this.saldo}`
  }
}
