import { Component, inject, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { loginService } from '../../service/login';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-form.html',
  styleUrls: ['./login-form.css']
})
export class LoginForm {
  @Output() closeLoginForm = new EventEmitter<void>();
  @Output() loggedIn = new EventEmitter<void>();
  @Output() registerClicked = new EventEmitter<void>();

  loginService = inject(loginService);
  userService = inject(UserService);
  router = inject(Router);

  showForgotPasswordModal = false;

  loginForm = new FormGroup({
    login: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.required),
    manterConectado: new FormControl(false)
  });

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  onSubmitLogin() {
    const { login, senha, manterConectado } = this.loginForm.value;
    if (!this.loginForm.valid || !login || !senha) {
      alert('Por favor, preencha os campos de usuário/email e senha corretamente.');
      return;
    }
    this.userService.login(login, senha, manterConectado || false).subscribe({
      error: (err) => {
        if (err.status === 401) {
          alert('O nome de usuário/email ou senha está incorreto ou não foi cadastrado!');
          return;
        }
        alert('Erro interno do servidor. Tente novamente mais tarde!');
      },
      next: () => {
        this.loggedIn.emit();
        this.router.navigate(['/dashboard']);
      }
    });
  }

  onRegisterClick(): void {
    this.registerClicked.emit();
  }

  openForgotPasswordModal(): void {
    this.showForgotPasswordModal = true;
  }

  closeForgotPasswordModal(): void {
    this.showForgotPasswordModal = false;
  }

  onSubmitForgotPassword(): void {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email!;
      this.userService.requestPasswordReset(email).subscribe({
        next: (response) => {
          if (response.exists) {
            this.closeForgotPasswordModal();
            alert('Se o email estiver correto, um link de recuperação foi enviado!');
          } else {
            alert('Email não encontrado em nossa base de dados.');
          }
        },
        error: () => {
          alert('Ocorreu um erro ao verificar o e-mail. Tente novamente mais tarde.');
        }
      });
    }
  }

  onCloseButtonClick(): void {
    this.closeLoginForm.emit();
  }
}
