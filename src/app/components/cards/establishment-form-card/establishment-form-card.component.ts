import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MyErrorStateMatcher } from '../../utils/MyErrorStateMatcher';
import { SpecialtyService } from 'src/app/services/specialty.service';
import { Specialty } from 'src/app/models/Specialty';
import { UF } from 'src/app/models/Address';

@Component({
  selector: 'app-establishment-form-card',
  templateUrl: './establishment-form-card.component.html',
  styleUrls: ['./establishment-form-card.component.scss']
})
export class EstablishmentFormCardComponent implements OnInit {

  inputPlaceholderSocialName = 'Insira a Razão Social';
  inputPlaceholderCnpj = 'Insira o CNPJ';
  inputPlaceholderName = 'Insira o Nome';
  inputPlaceholderPhone = 'Insira o Telefone';
  inputPlaceholderNeighborhood = 'Insira o Bairro';
  inputPlaceholderCity = 'Insira a Cidade';
  inputPlaceholderState = 'Insira o Estado';
  inputPlaceholderStreet = 'Insira a Rua';
  inputPlaceholderCep = 'Insira o Cep';
  inputPlaceholderComplement = 'Insira um Complemento';
  inputPlaceholderNumber = 'Insira o Número';
  inputPlaceholderSpecialty = 'Insira a Especialidade';

  ufList = UF;

  establishmentForm: FormGroup;

  cnpjMaxMinSize = 14;
  phoneMinSize = 10;
  phoneMaxSize = 11;
  cepMaxMinSize = 8;

  socialNameFormControl: FormControl = new FormControl('', [
    Validators.required,
  ]);

  cnpjFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(this.cnpjMaxMinSize),
    Validators.minLength(this.cnpjMaxMinSize)
  ]);

  nameFormControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  phoneFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(this.phoneMaxSize),
    Validators.minLength(this.phoneMinSize)
  ]);

  neighborhoodFormControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  cityFormControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  stateFormControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  streetFormControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  cepFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(this.cepMaxMinSize),
    Validators.minLength(this.cepMaxMinSize)
  ]);

  complementFormControl: FormControl = new FormControl('');

  numberFormControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  specialtyFormControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();

  specialtyOptions: Specialty[];

  constructor(
    private formBuilder: FormBuilder,
    private specialtyApi: SpecialtyService
    ) {
      this.establishmentForm = this.formBuilder.group({
        socialName: this.socialNameFormControl,
        cnpj: this.cnpjFormControl,
        phone: this.phoneFormControl,
        name: this.nameFormControl,
        neighborhood: this.neighborhoodFormControl,
        city: this.cityFormControl,
        state: this.stateFormControl,
        street: this.streetFormControl,
        cep: this.cepFormControl,
        complement: this.complementFormControl,
        number: this.numberFormControl,
        specialty: this.specialtyFormControl,
      });
    }

  // convenience getter for easy access to form fields
  get form() { return this.establishmentForm.controls; }

  ngOnInit(): void {
    this.specialtyApi.getAll().subscribe((data) => {
      this.specialtyOptions = data;
    });
  }
}
