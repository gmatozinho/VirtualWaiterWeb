/* Angular Imports */

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

/*  Project imports */

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ComponentsModule } from './components/components.module';

import { AngularFireModule} from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { UserService } from './services/user.service';
import { AuthenticationService } from './services/authentication.service';
import { EstablishmentService } from './services/establishment.service';
import { EmployeeService } from './services/employee.service';
import { AuthGuard } from './guards/auth.guard';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { MAT_DATE_LOCALE } from '@angular/material';
import { SpecialtyService } from './services/specialty.service';
import { ProductService } from './services/product.service';
import { SessionService } from './services/session.service';
import { MenuService } from './services/menu.service';
import { AuthGuardEstablishmentActive } from './guards/auth.guard.establishmentactive';
import { AuthGuardUserPermission } from './guards/auth.guard.userpermission';
import { AuthGuardAdminPermission } from './guards/auth.guard.adminpermission';


@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase, 'VirtualWaiter'),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [
    AuthGuard,
    AuthGuardEstablishmentActive,
    AuthGuardUserPermission,
    AuthGuardAdminPermission,
    UserService,
    AuthenticationService,
    EstablishmentService,
    EmployeeService,
    SpecialtyService,
    ProductService,
    SessionService,
    MenuService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
  ],
})
export class AppModule { }
