import { Component, inject, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { loginService } from '../../service/login';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css'
})
export class LoginForm {
  @Output() loggedIn = new EventEmitter<void>();
  @Output() registerClicked = new EventEmitter<void>(); // Adicionado o Output

  loginService = inject(loginService);
  router = inject(Router);


  loginForm = new FormGroup({
    login: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.required),
    manterConectado: new FormControl(false)
  });

 onSubmitLogin() {
    const { login, senha, manterConectado } = this.loginForm.value;
    if (!this.loginForm.valid || !login || !senha){
      alert('Por favor, preencha os campos de usuário/email e senha corretamente.');
      return;
    }
    this.loginService.login(login, senha, manterConectado || false).subscribe
    ({ 
      error: (err) => {
        if (err.status === 401) {
          alert('O nome de usuário/email ou senha está incorreto ou não foi cadastrado!')
          return;
        }
        
          alert('erro interno do servidor tente novamente mais tarde!')
        
      },
      next: () => {
        localStorage.setItem('showWelcomeOverlay', 'true'); // Set flag
        localStorage.setItem('welcomeMessage', 'Bem-vindo(a) ao AdotaPet! Juntos, vamos encontrar lares cheios de amor.');
        console.log('localStorage set: showWelcomeOverlay=', localStorage.getItem('showWelcomeOverlay'), 'welcomeMessage=', localStorage.getItem('welcomeMessage'));
        this.loggedIn.emit(); // Emit event instead of navigating
        this.router.navigate(['/dashboard']); // Redireciona para o dashboard após o login
      }
    })
    
  }

  onRegisterClick(): void { // Novo método para emitir o evento
    this.registerClicked.emit();
  }
}
