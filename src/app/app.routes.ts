import { Routes } from '@angular/router';
import { OngGuard } from './guards/ong.guard';
import { PartnerGuard } from './guards/partner.guard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home').then(c => c.Home)
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then(c => c.Login)
    },
    {
        path: 'home',
        pathMatch: 'full',
        loadComponent: () => import('./pages/home/home').then(c => c.Home)
    },
    {
        path: 'dashboard',
        pathMatch: 'full',
        loadComponent: () => import('./pages/dashboard/dashboard').then(c => c.Dashboard)
    },
    {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.component').then(c => c.ProfileComponent),
        canActivate: [authGuard]
    },
    {
        path: 'social',
        loadComponent: () => import('./pages/social/social.component').then(c => c.SocialComponent),
        canActivate: [authGuard]
    },
    {
        path: 'ong/pet-management',
        loadComponent: () => import('./pages/ong/pet-management/pet-management').then(c => c.PetManagementComponent),
        canActivate: [OngGuard]
    },
    {
        path: 'partner/product-management',
        loadComponent: () => import('./pages/partner/product-management/product-management').then(c => c.ProductManagementComponent),
        canActivate: [PartnerGuard]
    }];
