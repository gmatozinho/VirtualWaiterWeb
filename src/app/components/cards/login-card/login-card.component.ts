import { Component, OnInit, Input} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../utils/MyErrorStateMatcher';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss']

})
export class LoginCardComponent implements OnInit {

  @Input() cardTitle: string;

  inputPlaceholderPassword = 'Insira sua senha';
  inputHintPassword = 'Sua senha deve possuir ao menos 8 caracteres';

  loginForm: FormGroup;
  submitted = false;
  hide = true;

  passwordSize = 8;

  emailFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(this.passwordSize),
  ]);

  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();

  constructor(private formBuilder: FormBuilder,
              private authenticationApi: AuthenticationService,
              ) {}

  // convenience getter for easy access to form fields
  get form() { return this.loginForm.controls; }

  async login() {
    this.submitted = true;
    if (this.loginForm.valid) {
      const {email , password} = this.loginForm.value;
      this.authenticationApi.login(email, password);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: this.emailFormControl,
      password: this.passwordFormControl
    });
  }


}
