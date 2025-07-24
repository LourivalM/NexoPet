import { Component, inject, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { Usuario } from '../../models/user';
import { LoginForm } from '../login-form/login-form';
import { RegisterSelectionComponent } from '../register-selection/register-selection';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LoginForm, RegisterSelectionComponent],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header implements OnInit {
  userService = inject(UserService);
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);
  user: Usuario | null = null;
  showLoginForm: boolean = false;
  showRegisterSelection: boolean = false;

  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => {
      this.user = user;
      this.cdr.detectChanges(); // Força a detecção de mudanças
    });
  }

  isLoggedIn(): boolean {
    return !!this.user;
  }

  getUserNickname(): string | null {
    return this.user?.nickname || this.user?.nome || this.user?.nomeInstituicao || null;
  }

  getUserType(): 'pessoa' | 'ong' | 'parceiro' | null {
    return this.user?.tipo || null;
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/home']);
  }

  toggleLoginForm(): void {
    this.showLoginForm = !this.showLoginForm;
    this.showRegisterSelection = false; // Fecha a seleção de registro se o login for aberto
  }

  toggleRegisterSelection(): void {
    this.showRegisterSelection = !this.showRegisterSelection;
    this.showLoginForm = false; // Fecha o login se a seleção de registro for aberta
  }

  onContainerClick(event: Event): void {
    // Fecha o modal se o clique for fora do formulário
    if (event.target === event.currentTarget) {
      this.showLoginForm = false;
    }
  }

  onLoggedIn(): void {
    this.showLoginForm = false;
    // Lógica adicional após o login, se necessário
  }

  onCloseRegisterSelection(): void {
    this.showRegisterSelection = false;
  }
}