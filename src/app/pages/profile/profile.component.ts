import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../service/user.service';
import { Usuario } from '../../models/user';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ImageSelectorModalComponent } from '../../components/modals/image-selector-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ImageSelectorModalComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userService = inject(UserService);
  dialog = inject(MatDialog);
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

  saveProfile(): void {
    if (this.profileForm.valid && this.currentUser) {
      const updatedData = this.profileForm.value;
      this.userService.updateUser(this.currentUser.id, updatedData).subscribe({
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

  openImageSelector(): void {
    const dialogRef = this.dialog.open(ImageSelectorModalComponent);

    dialogRef.componentInstance.imageSelected.subscribe((imageName: string) => {
      if (this.currentUser) {
        const updatedData = { imageUrl: imageName };
        this.userService.updateUser(this.currentUser.id, updatedData).subscribe({
          next: (user) => {
            this.currentUser = user;
            dialogRef.close();
            alert('Foto de perfil atualizada com sucesso!');
          },
          error: (err) => {
            console.error('Erro ao atualizar foto de perfil:', err);
            alert('Erro ao atualizar foto de perfil. Tente novamente.');
          }
        });
      }
    });

    dialogRef.componentInstance.close.subscribe(() => {
      dialogRef.close();
    });
  }
}
