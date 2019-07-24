import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { CurrentUser } from '../services/authentication.service';
import { EnumTipoFuncionario } from '../models/EnumTipoFuncionario';
import { EnumOrigemCriacao } from '../models/EnumOrigemCriacao';

@Injectable()
export class AuthGuardUserPermission implements CanActivateChild {
    zero = 0;
    constructor(private router: Router) { }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser: CurrentUser =  JSON.parse(sessionStorage.getItem('currentUser'));
        if (currentUser.enumtipofuncionario === EnumTipoFuncionario.Gerente) {
            if (route.url[this.zero] && route.url[this.zero].path === 'dono') {
                if (currentUser.enumorigemcriacao === EnumOrigemCriacao.Dono) {
                    return true;
                } else {
                    return false;
                }
            }

            return true;
        } else {
            alert('Acesso não autorizado a página'
            + state.url +
            ', favor contatar a administração');
            return false;
        }

    }
}
