import { Employee } from './Employee';
import { Board } from './Board';
import { Product } from './Product';
import { Address } from './Address';
import { Specialty } from './Specialty';
export interface Establishment {
  id?: number;
  razaosocial?: string;
  cnpj?: string;
  nome?: string;
  descricao?: string;
  horariofuncionamento?: string;
  telefone?: string;
  logo?: string;
  avaliacaomedia?: number;
  ativo?: boolean;
  aberto?: boolean;
  funcionarios?: Employee[];
  mesas?: Board[];
  produtos?: Product[];
  especialidade?: Specialty;
  endereco?: Address;
  dono?: any;
  cardapio?: any;
}
