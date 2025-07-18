import { Component, inject, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { loginService } from '../../service/login';
import { LoginForm } from '../login-form/login-form';
import { RegisterSelectionComponent } from '../register-selection/register-selection';
import { Usuario } from '../../models/user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, LoginForm, RegisterSelectionComponent],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent implements OnInit {
  loginService = inject(loginService);
  isLoggedIn: boolean = false;
  showLoginForm: boolean = false;
  showRegisterSelection: boolean = false; // Nova propriedade
  user: Usuario | null = null; // Adicionado para armazenar o objeto do usuário

  @Output() toggleSideMenu = new EventEmitter<void>(); // Novo Output

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    this.user = this.loginService.getUser(); // Obter o objeto do usuário
    this.isLoggedIn = !!this.user; // Verificar se o usuário existe
    if (this.isLoggedIn) {
      this.showLoginForm = false; // Esconde o formulário se o usuário estiver logado
      this.showRegisterSelection = false; // Esconde o seletor de cadastro também
    }
  }

  onToggleSideMenu(): void {
    this.toggleSideMenu.emit();
  }

  toggleLoginForm(): void {
    this.showLoginForm = !this.showLoginForm;
    this.showRegisterSelection = false; // Garante que o seletor de cadastro esteja fechado
  }

  toggleRegisterSelection(): void { // Novo método
    this.showRegisterSelection = !this.showRegisterSelection;
    this.showLoginForm = false; // Garante que o formulário de login esteja fechado
  }

  onLoggedIn(): void {
    this.checkLoginStatus();
    this.showLoginForm = false; // Fecha o formulário após o login
  }

  onContainerClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('login-form-container')) {
      this.showLoginForm = false;
    }
  }

  onCloseRegisterSelection(): void { // Novo método para fechar o seletor
    this.showRegisterSelection = false;
  }

  logout(): void {
    this.loginService.logout();
    this.checkLoginStatus();
  }
}