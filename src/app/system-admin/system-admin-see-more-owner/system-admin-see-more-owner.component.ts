import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { emittersOptions } from 'src/app/models/Emitter';
import { OwnerService } from 'src/app/services/owner.service';
import { Owner } from 'src/app/models/Owner';
import { Specialty } from 'src/app/models/Specialty';
import { SpecialtyService } from 'src/app/services/specialty.service';
import { UF } from 'src/app/models/Address';
import {MatDialog} from '@angular/material';
import { PlanService } from 'src/app/services/plan.service';
import {
  SystemAdminChoosePlanDialogComponent
} from '../system-admin-choose-plan-dialog/system-admin-choose-plan-dialog.component';
import { EstablishmentPlanService } from 'src/app/services/establishment-plan.service';
import { EstablishmentPlan } from 'src/app/models/EstablishmentPlan';
import { EstablishmentService } from 'src/app/services/establishment.service';
import { Establishment } from 'src/app/models/Establishment';
import { MenuService } from 'src/app/services/menu.service';
import { Menu } from 'src/app/models/Menu';
import {
  SystemAdminConfirmationDialogComponent
} from '../system-admin-confirmation-dialog/system-admin-confirmation-dialog.component';

@Component({
  selector: 'app-system-admin-see-more-owner',
  templateUrl: './system-admin-see-more-owner.component.html',
  styleUrls: ['./system-admin-see-more-owner.component.scss']
})
export class SystemAdminSeeMoreOwnerComponent implements OnInit {

  inputPlaceholderEmail = 'Email';
  inputPlaceholderPhone = 'Telefone';
  inputPlaceholderName = 'Nome';
  inputPlaceholderLastname = 'Sobrenome';
  inputPlaceholderBirthday = 'Data de nascimento';
  inputPlaceholderCpf = 'CPF';
  inputPlaceholderRg = 'RG';
  inputPlaceholderEmitter = 'Orgão Emissor';
  inputPlaceholderSocialName = 'Razão Social';
  inputPlaceholderCnpj = 'CNPJ';
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
  buttonTitle = 'Ativar';

  owner: Owner;

  ufList = UF;

  zero = 0;

  emailFormControl: FormControl = new FormControl('');

  phoneFormControl: FormControl = new FormControl('');

  nameFormControl: FormControl = new FormControl('');

  lastnameFormControl: FormControl = new FormControl('');

  birthdayFormControl: FormControl = new FormControl('');

  cpfFormControl: FormControl = new FormControl('');

  rgFormControl: FormControl = new FormControl('');

  emitterFormControl: FormControl = new FormControl('');

  socialNameFormControl: FormControl = new FormControl('');

  cnpjFormControl: FormControl = new FormControl('');

  establishmentNameFormControl: FormControl = new FormControl('');

  establishmentPhoneFormControl: FormControl = new FormControl('');

  descriptionFormControl: FormControl = new FormControl('');

  logoFormControl: FormControl = new FormControl('');

  averageRatingFormControl: FormControl = new FormControl('');

  activeFormControl: FormControl = new FormControl('');

  openFormControl: FormControl = new FormControl('');

  workingScheduleFormControl: FormControl = new FormControl('');

  neighborhoodFormControl: FormControl = new FormControl('');

  cityFormControl: FormControl = new FormControl('');

  stateFormControl: FormControl = new FormControl('');

  streetFormControl: FormControl = new FormControl('');

  cepFormControl: FormControl = new FormControl('');

  complementFormControl: FormControl = new FormControl('');

  numberFormControl: FormControl = new FormControl('');

  specialtyFormControl: FormControl = new FormControl('');

  specialtyOptions: Specialty[];
  specialty: Specialty;

  emittersOptions = emittersOptions;

  constructor(
    private ownerApi: OwnerService,
    private route: ActivatedRoute,
    private specialtyApi: SpecialtyService,
    public dialog: MatDialog,
    private router: Router,
    private planApi: PlanService,
    private establishmentPlanApi: EstablishmentPlanService,
    private establishmentApi: EstablishmentService,
    private menuApi: MenuService
    ) {

    this.getOwner(this.route.snapshot.params.id);

  }

  getOwner(id: number) {
    this.ownerApi.getById(id).subscribe((data: Owner) => {
      this.owner = data[this.zero];
      if (this.owner.estabelecimento.ativo) {
        this.buttonTitle = 'Desativar';
      } else {
        this.buttonTitle = 'Ativar';
      }
      this.emailFormControl.setValue(this.owner.usuario.email);
      this.phoneFormControl.setValue(this.owner.celular);
      this.nameFormControl.setValue(this.owner.nome);
      this.lastnameFormControl.setValue(this.owner.sobrenome);
      this.birthdayFormControl.setValue(this.owner.datanascimento);
      this.cpfFormControl.setValue(this.owner.cpf);
      this.rgFormControl.setValue(this.owner.rg);
      this.emitterFormControl.setValue(this.owner.enumorgaoemissor);

      this.socialNameFormControl.setValue(this.owner.estabelecimento.razaosocial);
      this.cnpjFormControl.setValue(this.owner.estabelecimento.cnpj);
      this.establishmentNameFormControl.setValue(this.owner.estabelecimento.nome);
      this.establishmentPhoneFormControl.setValue(this.owner.estabelecimento.telefone);
      this.specialtyFormControl.setValue(this.owner.estabelecimento.especialidade.id);
      this.descriptionFormControl.setValue(this.owner.estabelecimento.descricao);
      this.logoFormControl.setValue(this.owner.estabelecimento.logo);
      this.averageRatingFormControl.setValue(this.owner.estabelecimento.avaliacaomedia);
      this.activeFormControl.setValue(this.owner.estabelecimento.ativo);
      this.openFormControl.setValue(this.owner.estabelecimento.aberto);
      this.workingScheduleFormControl.setValue(this.owner.estabelecimento.horariofuncionamento);
      this.neighborhoodFormControl.setValue(this.owner.estabelecimento.endereco.bairro);
      this.cityFormControl.setValue(this.owner.estabelecimento.endereco.cidade);
      this.stateFormControl.setValue(this.owner.estabelecimento.endereco.uf);
      this.streetFormControl.setValue(this.owner.estabelecimento.endereco.logradouro);
      this.cepFormControl.setValue(this.owner.estabelecimento.endereco.cep);
      this.complementFormControl.setValue(this.owner.estabelecimento.endereco.complemento);
      this.numberFormControl.setValue(this.owner.estabelecimento.endereco.numero);
    });
  }

  activateOrDisable() {
    const establishmentId = this.owner.estabelecimento.id;
    const status = this.owner.estabelecimento.ativo;
    if (status) {
      this.disable(establishmentId, !status);
    } else {
      this.activate(establishmentId, !status);
    }

  }

  activate(establishmentId: number, status: boolean) {
    this.planApi.getAll().subscribe((data) => {
      const dialogRef = this.dialog.open(SystemAdminChoosePlanDialogComponent, {
        width: '320px',
        data: {plans: data}
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          const newEstablishmentPlan: EstablishmentPlan = {
            datainicio: new Date(),
            datafim: new Date(),
            estabelecimentoid: establishmentId,
            planoid: result
          };

          this.establishmentPlanApi.create(newEstablishmentPlan).subscribe(() => {
            const updateEstablishment: Establishment = {
              id: establishmentId,
              ativo: status
            };

            this.establishmentApi.update(updateEstablishment).subscribe(() => {
              this.menuApi.getByEstablishmentId(establishmentId).subscribe((menus: Menu[]) => {
                const updateMenu = {
                  id: menus[this.zero].id,
                  ativo: status
                };

                this.menuApi.update(updateMenu).subscribe(() => {
                  alert('Plano inserido e estabelecimento ativado');
                  this.router.navigate(['/olimpo/parceiros']);
                });
              });
            });
          });
        }
      });
    });
  }



  disable(establishmentId: number, status: boolean) {
    const text = 'Tem certeza que querem desativar esse estabelecimento?';
    const dialogRef = this.dialog.open(SystemAdminConfirmationDialogComponent, {
      width: '320px',
      data: {text}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const updateEstablishment: Establishment = {
          id: establishmentId,
          ativo: status
        };

        this.establishmentApi.update(updateEstablishment).subscribe(() => {
          this.menuApi.getByEstablishmentId(establishmentId).subscribe((menus: Menu[]) => {
            const updateMenu = {
              id: menus[this.zero].id,
              ativo: status
            };

            this.menuApi.update(updateMenu).subscribe(() => {
              alert('Plano removido e estabelecimento desativado');
              this.router.navigate(['/olimpo/parceiros']);
            });
          });
        });
      }
    });
  }


  ngOnInit(): void {
    this.specialtyApi.getAll().subscribe((data) => {
      this.specialtyOptions = data;
    });
  }

}
