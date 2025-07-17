import { Routes } from '@angular/router';

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
    }];
