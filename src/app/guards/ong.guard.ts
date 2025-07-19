import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { loginService } from '../service/login';

@Injectable({
  providedIn: 'root'
})
export class OngGuard implements CanActivate {

  constructor(private loginService: loginService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.loginService.getUserType() === 'ong') {
      return true;
    } else {
      // Redireciona para a página de login ou home se não for uma ONG
      return this.router.createUrlTree(['/login']); // Ou '/home'
    }
  }
}
