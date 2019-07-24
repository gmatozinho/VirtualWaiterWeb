import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OwnerFormCardComponent } from 'src/app/components/cards/owner-form-card/owner-form-card.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GeneralPagesToolbarService } from '../general-pages-toolbar/general-pages-toolbar.service';
import { Specialty } from 'src/app/models/Specialty';
import { Establishment} from 'src/app/models/Establishment';
import { Owner } from 'src/app/models/Owner';
import { User } from 'src/app/models/User';
import { Address } from 'src/app/models/Address';
import {
  EstablishmentFormCardComponent
} from 'src/app/components/cards/establishment-form-card/establishment-form-card.component';
import { Menu } from 'src/app/models/Menu';

@Component({
  selector: 'app-register-partner',
  templateUrl: './register-partner.component.html',
  styleUrls: ['./register-partner.component.scss']
})
export class RegisterPartnerComponent implements OnInit {
  isLinear = true;

  @ViewChild(OwnerFormCardComponent, { static: true }) ownerFormCard: OwnerFormCardComponent;
  @ViewChild(EstablishmentFormCardComponent, { static: true }) establishmentFormCard: EstablishmentFormCardComponent;

  ownerForm: FormGroup;
  establishmentForm: FormGroup;

  owner: Owner;
  establishment: Establishment;
  user: User;
  address: Address;
  specialty: Specialty;
  menu: Menu;

  constructor(
    private authenticationApi: AuthenticationService,
    private generalPagesToolbarService: GeneralPagesToolbarService,
    ) { }

  buildOwner() {
    if (this.ownerForm.valid) {
      this.user = {
        email: this.ownerForm.value.email,
        enumorigemcriacao: 1
      };
      this.owner = {
        nome: this.ownerForm.value.name,
        sobrenome: this.ownerForm.value.lastname,
        datanascimento: new Date(this.ownerForm.value.birthday),
        cpf: this.ownerForm.value.cpf,
        rg: this.ownerForm.value.rg,
        enumorgaoemissor:  this.ownerForm.value.emitter,
        celular: this.ownerForm.value.phone,
        usuario: this.user
      };
    }
  }

  buildEstablishment() {

    if (this.establishmentForm.valid) {
      this.address = {
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

      this.menu = {
        descricao: this.establishmentForm.value.name ,
        ativo: false,
      };

      this.establishment = {
        razaosocial: this.establishmentForm.value.socialName,
        cnpj: this.establishmentForm.value.cnpj,
        nome: this.establishmentForm.value.name,
        telefone: this.establishmentForm.value.phone,
        horariofuncionamento: '',
        avaliacaomedia: 0,
        ativo: false,
        aberto: false,
        especialidade: this.establishmentForm.value.specialty,
        endereco: this.address,
        dono: this.owner,
        cardapio: this.menu
      };

    }
  }

  async register() {
      this.authenticationApi.register(this.establishment);
  }

  ngOnInit() {
    this.generalPagesToolbarService.itsLogin(false);
    this.ownerForm = this.ownerFormCard.ownerForm;
    this.establishmentForm = this.establishmentFormCard.establishmentForm;
  }

}
