import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const sessionEmail = sessionStorage.getItem('email');
    const localEmail = localStorage.getItem('email');
    const email = sessionEmail || localEmail;

    if (!email) {
      return router.createUrlTree(['/login']);
    }
    return true;
  } else {
    return true;
  }

  return true;
};
