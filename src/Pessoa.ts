export class Pessoa{
  nome:String;
  cpf: String;
  email:String;
  senha:String;
  numero: String;


  constructor(nome:String, cpf:String, email:String, senha:String, numero:String){
    this.nome = nome;
    this.cpf = cpf;
    this.email = email;
    this.senha = senha;
    this.numero = numero;
  }

}
