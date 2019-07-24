import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MyErrorStateMatcher } from '../../utils/MyErrorStateMatcher';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { emittersOptions } from 'src/app/models/Emitter';

@Component({
  selector: 'app-owner-form-card',
  templateUrl: './owner-form-card.component.html',
  styleUrls: ['./owner-form-card.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class OwnerFormCardComponent implements OnInit {
  inputPlaceholderEmail = 'Email';
  inputPlaceholderPhone = 'Telefone';
  inputPlaceholderName = 'Insira seu nome';
  inputPlaceholderLastname = 'Insira seu sobrenome';
  inputPlaceholderBirthday = 'Insira sua data de nascimento';
  inputPlaceholderCpf = 'Insira o seu CPF';
  inputPlaceholderRg = 'Insira o seu RG';
  inputPlaceholderEmitter = 'Orgão Emissor';
  checkboxText = `Atesto que todas as
  informações são verdadeiras e concordo com os termos e políticas
  de uso do sistema`;

  ownerForm: FormGroup;

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
      checkbox: [false, Validators.requiredTrue]
    });

  }


  // convenience getter for easy access to form fields
  get form() { return this.ownerForm.controls; }

  ngOnInit(): void {}

}
