import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { loginService } from '../service/login';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(loginService);
  const router = inject(Router);

  if (authService.getUser()) {
    return true;
  } else {
    return router.createUrlTree(['/login']);
  }
};
