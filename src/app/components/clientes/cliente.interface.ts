
export interface ICliente {
    id?: number;
    razaoNome: string;
    nomeFantasia: string;
    tipo: string;
    cnpj: string;
    cpf: string;

    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cep: string;
    codPais: string;
    uf: string;
    codMun: string;

    fone: string;
    email: string;
}

export const EMPTY_CLIENTE: ICliente =  {
  id: 0,
  razaoNome: '',
  nomeFantasia: '',
  tipo: 'J',
  cnpj: '',
  cpf: '',

  logradouro: '',
  numero: '',
  complemento: '',
  bairro: '',
  cep: '',
  codPais: '1058',
  uf: '',
  codMun: '',

  fone: '',
  email: '',
}
