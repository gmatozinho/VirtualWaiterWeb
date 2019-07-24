import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee, employeeTypeOptions } from 'src/app/models/Employee';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/components/utils/MyErrorStateMatcher';
import { emittersOptions } from 'src/app/models/Emitter';
import { EmployeeService } from 'src/app/services/employee.service';
import { AuthenticationService, CurrentUser } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-partner-employee',
  templateUrl: './partner-employee.component.html',
  styleUrls: ['./partner-employee.component.scss']
})
export class PartnerEmployeeComponent implements OnInit {
  title: string;
  buttonTitle: string;
  inputPlaceholderEmail = 'Email';
  inputPlaceholderPhone = 'Telefone';
  inputPlaceholderName = 'Insira seu nome';
  inputPlaceholderLastname = 'Insira seu sobrenome';
  inputPlaceholderBirthday = 'Insira sua data de nascimento';
  inputPlaceholderCpf = 'Insira o seu CPF';
  inputPlaceholderRg = 'Insira o seu RG';
  inputPlaceholderEmployeeType = 'Tipo Funcionário';
  inputPlaceholderEmitter = 'Orgão Emissor';
  employee: Employee;
  user: User;

  minYear = 1910;
  maxYear = 2005;
  day = 1;
  month = 1;
  minDate = new Date(this.minYear, this.month, this.day);
  maxDate = new Date(this.maxYear, this.month, this.day);
  zero = 0;
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

  employeeTypeFormControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  emitterFormControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();

  emittersOptions = emittersOptions;
  employeeTypeOptions = employeeTypeOptions;

  employeeForm: FormGroup;
  newroute: boolean;
  constructor(
    private employeeApi: EmployeeService,
    private router: Router,
    private authenticationApi: AuthenticationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
    ) {
      this.newroute = this.route.snapshot.url[this.zero].path === 'novo';
      this.buttonTitle = this.newroute ? 'Cadastrar' : 'Atualizar';

      this.employeeForm = this.formBuilder.group({
        email: this.emailFormControl,
        phone: this.phoneFormControl,
        name: this.nameFormControl,
        lastname: this.lastnameFormControl,
        birthday: this.birthdayFormControl,
        cpf: this.cpfFormControl,
        rg: this.rgFormControl,
        employeeType: this.employeeTypeFormControl,
        emitter: this.emitterFormControl,
      });

      if (!this.newroute) {
        this.getEmployee(this.route.snapshot.params.id);
      }
  }

  submit() {
    if (this.newroute) {
      this.register();
    } else {
      this.update();
    }

  }

  async register() {
    let currentUser: CurrentUser;
    currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    if (this.employeeForm.valid) {

      this.user = {
        email: this.employeeForm.value.email,
        enumorigemcriacao: 3,
        ativo: true
      };

      this.employee = {
        nome: this.employeeForm.value.name,
        sobrenome: this.employeeForm.value.lastname,
        datanascimento: new Date(this.employeeForm.value.birthday),
        cpf: this.employeeForm.value.cpf,
        rg: this.employeeForm.value.rg,
        enumorgaoemissor:  this.employeeForm.value.emitter,
        enumtipofuncionario: this.employeeForm.value.employeeType,
        celular: this.employeeForm.value.phone,
        estabelecimento: currentUser.estabelecimentoId,
        usuario: this.user,
        ativo: true
      };

      const email = this.user.email;
      const password = this.authenticationApi.generatePassword();

      await this.authenticationApi.firebaseRegister(email, password).then((firebaseResUser) => {
        this.user.uid = firebaseResUser.uid;

        this.employeeApi.create(this.employee).subscribe(() => {
          alert('Funcionário Criado');
          this.router.navigate(['/parceiro/funcionarios']);
        });

      }).catch((error) => {
        alert(error);
      });


    }
  }


  async update() {

    if (this.employeeForm.valid) {
      this.user = {
        id: this.employee.usuario.id,
        email: this.employeeForm.value.email,
        enumorigemcriacao: this.employee.usuario.enumorigemcriacao,
        ativo: this.employee.usuario.ativo,
        uid: this.employee.usuario.uid
      };

      this.employee = {
        id: this.employee.id,
        nome: this.employeeForm.value.name,
        sobrenome: this.employeeForm.value.lastname,
        datanascimento: new Date(this.employeeForm.value.birthday),
        cpf: this.employeeForm.value.cpf,
        rg: this.employeeForm.value.rg,
        enumorgaoemissor:  this.employeeForm.value.emitter,
        enumtipofuncionario: this.employeeForm.value.employeeType,
        celular: this.employeeForm.value.phone,
        estabelecimento: this.employee.estabelecimento.id,
        usuario: this.user,
        ativo: this.employee.ativo
      };

      if (this.employee.usuario.email !== this.user.email) {

        const email = this.user.email;
        const password = this.authenticationApi.generatePassword();

        const firebaseResUser = await this.authenticationApi.firebaseRegister(email, password);

        if (firebaseResUser) {
          this.user.uid = firebaseResUser.uid;

          this.employeeApi.update(this.employee).subscribe(() => {
            alert('Usuário Atualizado');
            this.router.navigate(['/parceiro/funcionarios']);
          });
        }


      } else {
        this.employeeApi.update(this.employee).subscribe(() => {
          alert('Usuário Atualizado');
          this.router.navigate(['/parceiro/funcionarios']);
        });
      }
    }

  }

  // convenience getter for easy access to form fields
  get form() { return this.employeeForm.controls; }

  getEmployee(id: number) {
   this.employeeApi.getById(id)
    .subscribe((data: Employee) => {
      this.employee = data[this.zero];
      this.emailFormControl.setValue(this.employee.usuario.email);
      this.phoneFormControl.setValue(this.employee.celular);
      this.nameFormControl.setValue(this.employee.nome);
      this.lastnameFormControl.setValue(this.employee.sobrenome);
      this.birthdayFormControl.setValue(this.employee.datanascimento);
      this.cpfFormControl.setValue(this.employee.cpf);
      this.rgFormControl.setValue(this.employee.rg);
      this.employeeTypeFormControl.setValue(this.employee.enumtipofuncionario);
      this.emitterFormControl.setValue(this.employee.enumorgaoemissor);
    });
  }

  ngOnInit() {
    this.route
      .data
      .subscribe(data => {
        this.title = data.title;
      });
  }


}
