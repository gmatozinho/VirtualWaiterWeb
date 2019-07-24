import { User } from './User';
import { Person } from './Person';

export interface Employee extends Person {
  enumtipofuncionario: number;
  usuario?: User;
  estabelecimento: any;
  ativo: boolean;
}

interface EmployeeType {
  name: string;
  value: EnumEmployeeType;
}

enum EnumEmployeeType {
  Gerente = 1,
  Garcom = 2,
  Cozinheiro = 3,
  Outro = 4
}

const employeeTypeOptions: EmployeeType[] = [
  {
    name: 'Gerente',
    value: EnumEmployeeType.Gerente
  },
  {
    name: 'Garçom',
    value: EnumEmployeeType.Garcom
  },
  {
    name: 'Cozinheiro',
    value: EnumEmployeeType.Cozinheiro
  },
  {
    name: 'Outro',
    value: EnumEmployeeType.Outro
  }
];

export { employeeTypeOptions };



