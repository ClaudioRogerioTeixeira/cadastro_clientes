
export interface ICliente {
    id?: number;
    razaoNome: string;
    nomeFantasia: string;
    tipo: string;
    cnpjCpf: string;

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
  tipo: '',
  cnpjCpf: '',

  logradouro: '',
  numero: '',
  complemento: '',
  bairro: '',
  cep: '',
  codPais: '',
  uf: '',
  codMun: '',

  fone: '',
  email: '',
}
