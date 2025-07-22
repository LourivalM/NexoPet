import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { Header } from './components/header/header';
import { SideMenu } from './components/side-menu/side-menu';
import { FooterComponent } from './components/shared/footer/footer.component';
import { WelcomeOverlay } from './components/bem-vindo/welcome-overlay';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Header, SideMenu, FooterComponent, WelcomeOverlay],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected title = 'sprint_Angular';
  router = inject(Router);
  userService = inject(UserService);

  showWelcomeOverlay: boolean = false;
  welcomeMessage: string = '';

  // GEMINI_MODIFICATION: Controla a visibilidade do conteúdo baseado no estado de login.
  // Inicialmente false para evitar flash de conteúdo não autorizado.
  showContent = false;
  constructor() {
    this.checkLoginStatus();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkLoginStatus();
    });
  }

  ngOnInit(): void {
    this.checkWelcomeOverlay();
  }

  checkWelcomeOverlay(): void {
    if (typeof localStorage !== 'undefined') {
      const showOverlay = localStorage.getItem('showWelcomeOverlay');
      const message = localStorage.getItem('welcomeMessage');

      if (showOverlay === 'true' && message) {
        this.welcomeMessage = message;
        this.showWelcomeOverlay = true;
        localStorage.removeItem('showWelcomeOverlay');
        localStorage.removeItem('welcomeMessage');
      }
    }
  }

  onOverlayClosed(): void {
    this.showWelcomeOverlay = false;
  }

  private checkLoginStatus(): void {
    const user = this.userService.getUser();
    const isLoggedIn = !!user;

    // Se estiver na página de login, sempre mostra o conteúdo.
    // Caso contrário, mostra o conteúdo apenas se estiver logado.
    this.showContent = this.router.url === '/login' || this.router.url === '/' || this.router.url === '/home' || this.router.url === '/dashboard' || isLoggedIn;
    console.log('Current URL:', this.router.url, ' - showContent:', this.showContent, ' - isLoggedIn:', isLoggedIn);
  }
}
