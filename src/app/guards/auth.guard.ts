import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../service/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  let isAuthenticated = false;
  userService.currentUser.subscribe(user => {
    isAuthenticated = !!user;
  });

  if (isAuthenticated) {
    return true;
  } else {
    return router.createUrlTree(['/login']);
  }
};
