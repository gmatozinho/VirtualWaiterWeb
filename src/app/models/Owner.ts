import { User } from './User';
import { Person } from './Person';
export interface Owner extends Person {
  usuario?: User;
  estabelecimento?: any;
}
