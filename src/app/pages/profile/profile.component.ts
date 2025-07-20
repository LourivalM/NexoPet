import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { loginService } from '../../service/login';
import { Usuario } from '../../models/user';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  authService = inject(loginService);
  currentUser: Usuario | null = null;
  isEditing: boolean = false;
  profileForm: FormGroup;

  constructor() {
    this.profileForm = new FormGroup({
      nickname: new FormControl('', Validators.required),
      nome: new FormControl(''),
      nomeInstituicao: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl(''),
      cidade: new FormControl(''),
      estado: new FormControl(''),
      pais: new FormControl(''),
      nomeSocial: new FormControl(''),
      cnpj: new FormControl(''),
      rua: new FormControl(''),
      numero: new FormControl(''),
      bairro: new FormControl(''),
      cargoRepresentante: new FormControl(''),
      areaAtuacao: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getUser();
    if (this.currentUser) {
      this.profileForm.patchValue(this.currentUser);
    }
  }

  toggleEditMode(): void {
    this.isEditing = !this.isEditing;
    if (this.isEditing && this.currentUser) {
      this.profileForm.patchValue(this.currentUser);
    }
  }

  saveProfile(): void {
    if (this.profileForm.valid && this.currentUser) {
      const updatedData = this.profileForm.value;
      this.authService.updateUser(this.currentUser.id, updatedData).subscribe({
        next: (user) => {
          this.currentUser = user;
          this.isEditing = false;
          alert('Perfil atualizado com sucesso!');
        },
        error: (err) => {
          console.error('Erro ao atualizar perfil:', err);
          alert('Erro ao atualizar perfil. Tente novamente.');
        }
      });
    }
  }
}
