import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/components/utils/MyErrorStateMatcher';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GeneralPagesToolbarService } from '../general-pages-toolbar/general-pages-toolbar.service';

@Component({
  selector: 'app-redefine-password',
  templateUrl: './redefine-password.component.html',
  styleUrls: ['./redefine-password.component.scss']
})
export class RedefinePasswordComponent implements OnInit {
  request = true;
  send = false;
  emailFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();
  constructor(
    private authenticationApi: AuthenticationService,
    private generalPagesToolbarService: GeneralPagesToolbarService
  ) { }

  redefine() {
    if (this.emailFormControl.valid) {
      this.authenticationApi.resetPassword(this.emailFormControl.value);

      this.request = false;
      this.send = true;
      this.generalPagesToolbarService.itsLogin(false);
    }
  }

  ngOnInit(): void {
  }

}
