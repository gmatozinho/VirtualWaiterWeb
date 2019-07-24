import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { User } from '../models/User';
import { EnumOrigemCriacao } from '../models/EnumOrigemCriacao';

@Injectable()
export class AuthGuardAdminPermission implements CanActivateChild {

    constructor(private router: Router) { }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const admin: User =  JSON.parse(sessionStorage.getItem('admin'));
        if (admin) {
            if (admin.enumorigemcriacao === EnumOrigemCriacao.Administrador) {
                // logged in so return true
                return true;
            }
            // not logged in so redirect to login page with the return url
            alert('You Shall Not Pass');
            return false;
        }

        alert('Acesso Não Autorizado');
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/entrar'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
