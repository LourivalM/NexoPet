import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../service/user.service';
import { Usuario } from '../../models/user';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { loginService } from '../../service/login'; // Removido .ts
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs'; // Adicionado Observable

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userService = inject(UserService);
  loginService = inject(loginService);
  currentUser: Usuario | null = null;
  isEditing: boolean = false;
  profileForm: FormGroup;
  selectedFile: File | null = null;

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
      bio: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.currentUser = this.userService.getUser();
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

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  saveProfile(): void {
    if (this.profileForm.valid && this.currentUser) {
      const updatedData = this.profileForm.value;

      let uploadImageObservable: Observable<{ imageUrl: string }> = of({ imageUrl: this.currentUser.imageUrl || '' });

      if (this.selectedFile) {
        uploadImageObservable = this.loginService.uploadImage(this.selectedFile);
      }

      uploadImageObservable.pipe(
        switchMap((uploadResponse: { imageUrl: string }) => {
          if (this.selectedFile) {
            updatedData.imageUrl = uploadResponse.imageUrl;
          }
          return this.userService.updateUser(this.currentUser!.id, updatedData);
        })
      ).subscribe({
        next: (user: Usuario) => {
          this.currentUser = user;
          this.userService.setCurrentUser(user); // Atualiza o usuário no serviço
          this.isEditing = false;
          this.selectedFile = null; // Limpa o arquivo selecionado
          alert('Perfil atualizado com sucesso!');
        },
        error: (err: any) => {
          console.error('Erro ao atualizar perfil:', err);
          alert('Erro ao atualizar perfil. Tente novamente.');
        }
      });
    }
  }
}
