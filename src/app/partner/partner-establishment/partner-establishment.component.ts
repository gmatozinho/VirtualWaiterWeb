import { Component, OnInit } from '@angular/core';
import { EstablishmentService } from 'src/app/services/establishment.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/components/utils/MyErrorStateMatcher';
import { Specialty } from 'src/app/models/Specialty';
import { SpecialtyService } from 'src/app/services/specialty.service';
import { Establishment } from 'src/app/models/Establishment';
import { Router } from '@angular/router';
import { Address, UF } from 'src/app/models/Address';

interface Ids {
  estabelecimentoId: number;
  enderecoId: number;
}

@Component({
  selector: 'app-partner-establishment',
  templateUrl: './partner-establishment.component.html',
  styleUrls: ['./partner-establishment.component.scss']
})
export class PartnerEstablishmentComponent implements OnInit {
  inputPlaceholderSocialName = 'Razão Social';
  inputPlaceholderCnpj = 'CNPJ';
  inputPlaceholderName = 'Nome';
  inputPlaceholderPhone = 'Telefone';
  inputPlaceholderDescription = 'Descrição';
  inputPlaceholderLogo = 'Logo';
  inputPlaceholderAverageRating = 'Avaliação Media';
  inputPlaceholderActive = 'Ativo';
  inputPlaceholderWorkingSchedule = 'Horário de Funcionamento';
  inputPlaceholderNeighborhood = 'Bairro';
  inputPlaceholderCity = 'Cidade';
  inputPlaceholderState = 'UF';
  inputPlaceholderStreet = 'Rua';
  inputPlaceholderCep = 'CEP';
  inputPlaceholderComplement = 'Insira um Complemento';
  inputPlaceholderNumber = 'Número';
  inputPlaceholderSpecialty = 'Especialidade';

  arrayPos = 0;
  establishmentForm: FormGroup;
  formSubmitted = false;
  establishment: Establishment;
  // establishmentId: number;
  ids: Ids = {
    estabelecimentoId: 0,
    enderecoId: 0
  };

  ufList = UF;

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

  descriptionFormControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  logoFormControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  averageRatingFormControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  activeFormControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  openFormControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  workingScheduleFormControl: FormControl = new FormControl('', [
    Validators.required
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
  address: Address;
  specialty: Specialty;

  constructor(
    private establishmentApi: EstablishmentService,
    private formBuilder: FormBuilder,
    private specialtyApi: SpecialtyService,
    private router: Router,
    ) {
    this.establishmentForm = this.formBuilder.group({
      socialName: this.socialNameFormControl,
      cnpj: this.cnpjFormControl,
      name: this.nameFormControl,
      phone: this.phoneFormControl,
      specialty: this.specialtyFormControl,
      description: this.descriptionFormControl,
      logo: this.logoFormControl,
      averageRating: this.averageRatingFormControl,
      active: this.activeFormControl,
      open: this.openFormControl,
      workingSchedule: this.workingScheduleFormControl,
      neighborhood: this.neighborhoodFormControl,
      city: this.cityFormControl,
      state: this.stateFormControl,
      street: this.streetFormControl,
      cep: this.cepFormControl,
      complement: this.complementFormControl,
      number: this.numberFormControl,
    });

    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.establishmentApi.getById(currentUser.estabelecimentoId).subscribe((data) => {
      this.ids.estabelecimentoId = data[this.arrayPos].id;
      this.ids.enderecoId  = data[this.arrayPos].endereco.id;

      this.socialNameFormControl.setValue(data[this.arrayPos].razaosocial);
      this.cnpjFormControl.setValue(data[this.arrayPos].cnpj);
      this.nameFormControl.setValue(data[this.arrayPos].nome);
      this.phoneFormControl.setValue(data[this.arrayPos].telefone);
      this.specialtyFormControl.setValue(data[this.arrayPos].especialidade.id);
      this.descriptionFormControl.setValue(data[this.arrayPos].descricao);
      this.logoFormControl.setValue(data[this.arrayPos].logo);
      this.averageRatingFormControl.setValue(data[this.arrayPos].avaliacaomedia);
      this.activeFormControl.setValue(data[this.arrayPos].ativo);
      this.openFormControl.setValue(data[this.arrayPos].aberto);
      this.workingScheduleFormControl.setValue(data[this.arrayPos].horariofuncionamento);
      this.neighborhoodFormControl.setValue(data[this.arrayPos].endereco.bairro);
      this.cityFormControl.setValue(data[this.arrayPos].endereco.cidade);
      this.stateFormControl.setValue(data[this.arrayPos].endereco.uf);
      this.streetFormControl.setValue(data[this.arrayPos].endereco.logradouro);
      this.cepFormControl.setValue(data[this.arrayPos].endereco.cep);
      this.complementFormControl.setValue(data[this.arrayPos].endereco.complemento);
      this.numberFormControl.setValue(data[this.arrayPos].endereco.numero);

    });
  }

  update() {
    if (this.establishmentForm.valid) {
      this.address = {
        id: this.ids.enderecoId,
        bairro: this.establishmentForm.value.neighborhood,
        cidade: this.establishmentForm.value.city,
        uf: this.establishmentForm.value.state,
        logradouro: this.establishmentForm.value.street,
        cep: this.establishmentForm.value.cep,
        complemento: this.establishmentForm.value.complement,
        numero: this.establishmentForm.value.number
      };

      this.specialty = {
        descricao: this.establishmentForm.value.specialty,
      };

      this.establishment = {
        id: this.ids.estabelecimentoId,
        razaosocial: this.establishmentForm.value.socialName,
        cnpj: this.establishmentForm.value.cnpj,
        nome: this.establishmentForm.value.name,
        telefone: this.establishmentForm.value.phone,
        ativo: this.establishmentForm.value.active,
        aberto: this.establishmentForm.value.open,
        descricao: this.establishmentForm.value.description,
        logo: this.establishmentForm.value.logo,
        horariofuncionamento: this.establishmentForm.value.workingSchedule,
        especialidade: this.establishmentForm.value.specialty,
        endereco: this.address
      };

      this.establishmentApi.update(this.establishment).subscribe(() => {
        const message = 'Estabelecimento atualizado com sucesso!';
        alert(message);
        window.location.reload();
        /* this.router.navigate(['/parceiro/inicio']);
        this.formSubmitted = false; */
      });


    }

  }

  yourOnUploadHandler(event: { originalUrl: string; }) {
    this.logoFormControl.setValue(event.originalUrl);
  }

  ngOnInit() {
    this.specialtyApi.getAll().subscribe((data) => {
      this.specialtyOptions = data;
    });
  }

}
