import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/components/utils/MyErrorStateMatcher';
import { emittersOptions } from 'src/app/models/Emitter';
import { CurrentUser, AuthenticationService } from 'src/app/services/authentication.service';
import { OwnerService } from 'src/app/services/owner.service';
import { Owner } from 'src/app/models/Owner';
import { User } from 'src/app/models/User';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-partner-owner',
  templateUrl: './partner-owner.component.html',
  styleUrls: ['./partner-owner.component.scss']
})
export class PartnerOwnerComponent implements OnInit {

  inputPlaceholderEmail = 'Email';
  inputPlaceholderPhone = 'Telefone';
  inputPlaceholderName = 'Insira seu nome';
  inputPlaceholderLastname = 'Insira seu sobrenome';
  inputPlaceholderBirthday = 'Insira sua data de nascimento';
  inputPlaceholderCpf = 'Insira o seu CPF';
  inputPlaceholderRg = 'Insira o seu RG';
  inputPlaceholderEmitter = 'Orgão Emissor';
  buttonTitle = 'Confirmar';

  ownerForm: FormGroup;
  owner: Owner;
  user: User;

  zero = 0;
  minYear = 1910;
  maxYear = 2005;
  day = 1;
  month = 1;
  minDate = new Date(this.minYear, this.month, this.day);
  maxDate = new Date(this.maxYear, this.month, this.day);

  cpfMaxMinSize = 11;
  rgMaxMinSize = 7;
  phoneMinSize = 10;
  phoneMaxSize = 11;

  emailFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  phoneFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(this.phoneMaxSize),
    Validators.minLength(this.phoneMinSize)
  ]);

  nameFormControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  lastnameFormControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  birthdayFormControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  cpfFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(this.cpfMaxMinSize),
    Validators.minLength(this.cpfMaxMinSize)
  ]);

  rgFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(this.rgMaxMinSize),
    Validators.minLength(this.rgMaxMinSize)
  ]);

  emitterFormControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();

  emittersOptions = emittersOptions;

  constructor(
    private formBuilder: FormBuilder,
    private ownerApi: OwnerService,
    private authenticationApi: AuthenticationService,
    private router: Router,
    ) {
    this.ownerForm = this.formBuilder.group({
      email: this.emailFormControl,
      phone: this.phoneFormControl,
      name: this.nameFormControl,
      lastname: this.lastnameFormControl,
      birthday: this.birthdayFormControl,
      cpf: this.cpfFormControl,
      rg: this.rgFormControl,
      emitter: this.emitterFormControl,
    });

    let currentUser: CurrentUser;
    currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    this.getOwner(currentUser.funcionarioId);

  }

  getOwner(id: number) {
    this.ownerApi.getById(id).subscribe((data: Owner) => {
      this.owner = data[this.zero];
      this.emailFormControl.setValue(this.owner.usuario.email);
      this.phoneFormControl.setValue(this.owner.celular);
      this.nameFormControl.setValue(this.owner.nome);
      this.lastnameFormControl.setValue(this.owner.sobrenome);
      this.birthdayFormControl.setValue(this.owner.datanascimento);
      this.cpfFormControl.setValue(this.owner.cpf);
      this.rgFormControl.setValue(this.owner.rg);
      this.emitterFormControl.setValue(this.owner.enumorgaoemissor);
    });
  }

  submit() {
    this.update();
  }

  async update() {

    if (this.ownerForm.valid) {
      this.user = {
        id: this.owner.usuario.id,
        email: this.ownerForm.value.email,
        enumorigemcriacao: this.owner.usuario.enumorigemcriacao,
        ativo: this.owner.usuario.ativo,
        uid: this.owner.usuario.uid
      };

      this.owner = {
        id: this.owner.id,
        nome: this.ownerForm.value.name,
        sobrenome: this.ownerForm.value.lastname,
        datanascimento: new Date(this.ownerForm.value.birthday),
        cpf: this.ownerForm.value.cpf,
        rg: this.ownerForm.value.rg,
        enumorgaoemissor:  this.ownerForm.value.emitter,
        celular: this.ownerForm.value.phone,
        estabelecimento: this.owner.estabelecimento.id,
        usuario: this.user,
      };

      if (this.owner.usuario.email !== this.user.email) {

        const email = this.user.email;
        const password = this.authenticationApi.generatePassword();

        const firebaseResUser = await this.authenticationApi.firebaseRegister(email, password);

        if (firebaseResUser) {
          this.user.uid = firebaseResUser.uid;

          this.ownerApi.update(this.owner).subscribe(() => {
            alert('Dono Atualizado');
            this.router.navigate(['/parceiro/dashboard']);
          });
        }


      } else {
        this.ownerApi.update(this.owner).subscribe(() => {
          alert('Dono Atualizado');
          this.router.navigate(['/parceiro/dashboard']);
        });
      }
    }

  }


  // convenience getter for easy access to form fields
  get form() { return this.ownerForm.controls; }

  ngOnInit(): void {}

}
