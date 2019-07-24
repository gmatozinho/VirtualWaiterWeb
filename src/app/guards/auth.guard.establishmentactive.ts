import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { CurrentUser } from '../services/authentication.service';

@Injectable()
export class AuthGuardEstablishmentActive implements CanActivateChild {
    message = 'Favor assinar um de nossos planos para possuir acesso a\n' +
    'esse recurso, caso já tenha assinado favor entre em contato conosco:\n' +
    'adm.virtualwaiter@gmail.com';
    constructor(private router: Router) { }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser: CurrentUser =  JSON.parse(sessionStorage.getItem('currentUser'));
        if (currentUser.estabelecimentoAtivo) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        alert(this.message);
        return false;
    }
}
