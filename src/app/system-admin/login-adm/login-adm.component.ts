import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { EnumOrigemCriacao } from 'src/app/models/EnumOrigemCriacao';


@Component({
  selector: 'app-login-adm',
  templateUrl: './login-adm.component.html',
  styleUrls: ['./login-adm.component.scss']
})
export class LoginAdmComponent implements OnInit {
  zero = 0;
  cardTitle = 'Aqui que vocês logam Deuses';
  constructor(public  afAuth: AngularFireAuth, public  router: Router, private userApi: UserService) { }

  ngOnInit(): void {
  }

  async loginWithGoogle() {
    const res = await  this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this.userApi.getByEmail(res.user.email).subscribe((data: User) => {
      if (data[this.zero] && data[this.zero].enumorigemcriacao === EnumOrigemCriacao.Administrador) {
        sessionStorage.setItem('admin', JSON.stringify(data[this.zero]));
        this.router.navigate(['/olimpo/parceiros']);

      } else {
        alert('You Shall not Pass');
      }
    });
  }

}
