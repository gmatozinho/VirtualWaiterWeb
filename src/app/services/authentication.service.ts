import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from '../models/User';
import { AngularFirestore } from '@angular/fire/firestore';
import { EstablishmentService } from './establishment.service';
import { Establishment } from '../models/Establishment';
import { OwnerService } from './owner.service';
import { EmployeeService } from './employee.service';
import { EnumOrigemCriacao } from '../models/EnumOrigemCriacao';

export interface CurrentUser extends User {
  nome?: string;
  sobrenome?: string;
  enumtipofuncionario?: number;
  funcionarioId?: number;
  estabelecimentoId?: number;
  cardapioId?: number;
  estabelecimentoAtivo?: boolean;
  estabelecimentoNome?: string;
}

interface AuthenticationError {
  message: string;
  code: string;
}


@Injectable()
export class AuthenticationService {
  // Alternative for checkboxes

  dictionary: Array<string>;
  passwordLenght = 10;
  firstArrayPos = 0;

  constructor(
    private afAuth: AngularFireAuth,
    private userApi: UserService,
    private establishmentApi: EstablishmentService,
    private router: Router,
    public afStore: AngularFirestore,
    private ownerApi: OwnerService,
    private employeeApi: EmployeeService,
  ) { }

  async login(email: string, password: string) {
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      if (res.user) {
        this.userApi.getByEmail(email).subscribe((data) => {
          const currentUser: CurrentUser = data[this.firstArrayPos];
          if (currentUser) {
            // login successful if there's a jwt token in the response
            if (currentUser.enumorigemcriacao === EnumOrigemCriacao.Dono) {
              this.ownerApi.getByUserId(currentUser.id).subscribe((userData) => {
                const owner = userData[this.firstArrayPos];
                const establishment = owner.estabelecimento;
                currentUser.nome = owner.nome;
                currentUser.sobrenome = owner.sobrenome;
                currentUser.enumtipofuncionario = 1;
                currentUser.funcionarioId = owner.id;
                currentUser.estabelecimentoId = establishment.id;
                currentUser.cardapioId = establishment.cardapio.id;
                currentUser.estabelecimentoAtivo = establishment.ativo;
                currentUser.estabelecimentoNome = establishment.nome;

                // store user details and jwt token in local storage to keep user logged in between page refreshes
                const message = 'Bem vindo!';
                this.setSessionStorage(currentUser, res.user, message);
              });
            } else if (currentUser.enumorigemcriacao === EnumOrigemCriacao.Funcionario) {
              this.employeeApi.getByUserId(currentUser.id).subscribe((employeeData) => {
                const employee = employeeData[this.firstArrayPos];
                const establishment = employee.estabelecimento;
                currentUser.nome = employee.nome;
                currentUser.sobrenome = employee.sobrenome;
                currentUser.enumtipofuncionario = employee.enumtipofuncionario;
                currentUser.funcionarioId = employee.id;
                currentUser.estabelecimentoId = establishment.id;
                currentUser.cardapioId = establishment.cardapio.id;
                currentUser.estabelecimentoAtivo = establishment.ativo;
                currentUser.estabelecimentoNome = establishment.nome;

                // store user details and jwt token in local storage to keep user logged in between page refreshes
                const message = 'Bem vindo!';
                this.setSessionStorage(currentUser, res.user, message);
              });

            } else {
              alert('Acesso não autorizado');
              /* throw new Error ('Acesso não autorizado'); */
            }
          } else {
            alert('Usuário Não Existe');
            /* throw new Error ('Usuário Não Existe'); */
          }

        });
      }
    } catch (err) {
      console.dir(err);
      if (err.code === 'auth/user-not-found') {
        alert('Usuário não encontrado');
      } else if (err.code === 'auth/wrong-password') {
        alert('Dados Inválidos');
      } else {
        alert('Erro no Servidor');
      }
    }
  }

  logout() {
    this.afAuth.auth.signOut();
    // remove user from Session storage to log user out
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/home']);
  }

  async register(establishment: Establishment) {
    try {
      const email = establishment.dono.usuario.email;
      const password = this.generatePassword();

      const firebaseResUser = await this.firebaseRegister(email, password);

      if (firebaseResUser) {
        establishment.dono.usuario.uid = firebaseResUser.uid;
        establishment.dono.usuario.ativo = true;

        this.establishmentApi.create(establishment).subscribe((establishmentData) => {
          const currentUser: CurrentUser = establishmentData.dono.usuario;
          currentUser.nome = establishmentData.dono.nome;
          currentUser.sobrenome = establishmentData.dono.sobrenome;
          currentUser.enumtipofuncionario = 1;
          currentUser.funcionarioId = establishmentData.dono.id;
          currentUser.estabelecimentoId = establishmentData.id;
          currentUser.cardapioId = establishmentData.cardapio.id;
          currentUser.estabelecimentoAtivo = establishmentData.ativo;
          currentUser.estabelecimentoNome = establishmentData.nome;

          const message = 'Você foi cadastrado!';
          this.setSessionStorage(currentUser, firebaseResUser, message);
        });
      }
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        this.showAlert('O endereço de e-mail já está sendo usado por outra conta.');
      } else {
        console.dir(err);
        this.showAlert(err.message);
      }
    }
  }

  async firebaseRegister(email: string, password: string) {
    const res =  await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    await this.resetPassword(res.user.email);

    if (res.user) {
      this.afStore.doc(`users/${res.user.uid}`).set({
        email,
      });

      return res.user;
    }


  }

  async resetPassword(email: string) {
    await this.afAuth.auth.sendPasswordResetEmail(email);
  }


  setSessionStorage(currentUser: CurrentUser, res: firebase.User, message: string) {
    if (currentUser && (currentUser.email === res.email)) {
      // store user details and jwt token in Session storage to keep user logged in between page refreshes
      sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
      this.showAlert(message);
      this.router.navigate(['/parceiro/inicio']);
    }
  }

  async showAlert(message: string) {
    await alert(message);
  }

    // Generate password
  generatePassword() {
    // Create array from chosen checkboxes
    this.dictionary = [].concat(
        'abcdefghijklmnopqrstuvwxyz'.split(''),
      'ABCDEFGHIJKLMNOPWRSTUVWXYZ'.split(''),
      '0123456789'.split(''),
      '!@#$%^&*-_=+\\|:;\',.\<>/?~'.split('')
    );

    // Generate random password from array
    let newPassword = '';
    for (let i = 0; i < this.passwordLenght; i++) {
      newPassword += this.dictionary[Math.floor(Math.random() * this.dictionary.length)];
    }

    return newPassword;
  }
}
