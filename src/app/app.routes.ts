import { Routes } from '@angular/router';
import { OngGuard } from './guards/ong.guard';
import { PartnerGuard } from './guards/partner.guard';
import { authGuard } from './guards/auth.guard';

import { PetDetailComponent } from './pages/pet-detail/pet-detail.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

export const routes: Routes = [
    {
        path: 'pets/:id',
        loadComponent: () => import('./pages/pet-detail/pet-detail.component').then(c => c.PetDetailComponent)
    },
    {
        path: 'products/:id',
        loadComponent: () => import('./pages/product-detail/product-detail.component').then(c => c.ProductDetailComponent)
    },
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
    },
    {
        path: 'sobre-nos',
        loadComponent: () => import('./pages/institutional/about/about.component').then(c => c.AboutComponent)
    },
    {
        path: 'faq',
        loadComponent: () => import('./pages/institutional/faq/faq.component').then(c => c.FaqComponent)
    },
    {
        path: 'contato',
        loadComponent: () => import('./pages/institutional/contact/contact.component').then(c => c.ContactComponent)
    },
    {
        path: 'blog',
        loadComponent: () => import('./pages/institutional/blog/blog.component').then(c => c.BlogComponent)
    },
    {
        path: 'blog/:id',
        loadComponent: () => import('./pages/institutional/blog/article-detail/article-detail.component').then(c => c.ArticleDetailComponent)
    },
    {
        path: 'privacy',
        loadComponent: () => import('./pages/institutional/privacy/privacy-policy.component').then(c => c.PrivacyPolicyComponent)
    },
    {
        path: 'ongs',
        loadComponent: () => import('./pages/ong-list/ong-list.component').then(c => c.OngListComponent)
    },
    {
        path: 'partners',
        loadComponent: () => import('./pages/partner-list/partner-list.component').then(c => c.PartnerListComponent)
    },
    {
        path: 'my-gallery',
        loadComponent: () => import('./pages/my-gallery/my-gallery.component').then(c => c.MyGalleryComponent),
        canActivate: [authGuard]
    },
    {
        path: 'inbox',
        loadComponent: () => import('./pages/inbox/inbox.component').then(c => c.InboxComponent)
    },
    {
        path: 'add-friends',
        loadComponent: () => import('./pages/add-friends/add-friends.component').then(c => c.AddFriendsComponent)
    },
    {
        path: '**',
        redirectTo: '/home'
    }
];
