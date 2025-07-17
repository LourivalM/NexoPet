import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { loginService } from '../../service/login';
import { LoginForm } from '../login-form/login-form';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, LoginForm],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent implements OnInit {
  loginService = inject(loginService);
  isLoggedIn: boolean = false;
  showLoginForm: boolean = false;
  userType: 'pessoa' | 'ong' | null = null;

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    this.userType = this.loginService.getUserType();
    this.isLoggedIn = !!this.userType;
    if (this.isLoggedIn) {
      this.showLoginForm = false; // Esconde o formulário se o usuário estiver logado
    }
  }

  toggleLoginForm(): void {
    this.showLoginForm = !this.showLoginForm;
  }

  onLoggedIn(): void {
    this.checkLoginStatus();
  }

  logout(): void {
    this.loginService.logout();
    this.checkLoginStatus();
  }
}
