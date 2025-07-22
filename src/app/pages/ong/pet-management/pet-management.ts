import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { PetService } from '../../../service/pet.service';
import { Pet } from '../../../models/pet';
import { PetFormComponent } from '../../../components/forms/pet-form/pet-form';
import { UserService } from '../../../service/user.service';
import { ConfirmationModalComponent } from '../../../components/modals/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-pet-management',
  standalone: true,
  imports: [CommonModule, PetFormComponent, ConfirmationModalComponent],
  templateUrl: './pet-management.html',
  styleUrls: ['./pet-management.css']
})
export class PetManagementComponent implements OnInit {
  pets$!: Observable<Pet[]>;
  showPetForm: boolean = false;
  showConfirmationModal: boolean = false;
  selectedPetIdToDelete: number | null = null;
  petToEdit: Pet | null = null;

  constructor(private petService: PetService, private userService: UserService) { }

  ngOnInit(): void {
    this.pets$ = this.petService.getPets();
  }

  onAddNewPetClick(): void {
    this.petToEdit = null;
    this.showPetForm = true;
  }

  onEditPetClick(pet: Pet): void {
    this.petToEdit = pet;
    this.showPetForm = true;
  }

  handlePetFormSubmit(pet: Pet): void {
    if (this.petToEdit) {
      // Modo de Edição
      this.petService.updatePet(this.petToEdit.id, { ...pet, ong: this.petToEdit.ong }).subscribe(() => {
        this.showPetForm = false;
        this.petToEdit = null;
        this.pets$ = this.petService.getPets();
      });
    } else {
      // Modo de Adição
      const currentUser = this.userService.getUser();
      if (currentUser && currentUser.tipo === 'ong') {
        pet.ong = currentUser.nickname || currentUser.nomeInstituicao || '';
        this.petService.addPet(pet).subscribe(() => {
          this.showPetForm = false;
          this.pets$ = this.petService.getPets();
        });
      } else {
        console.error('Usuário não é uma ONG ou não está logado.');
      }
    }
  }

  openDeleteConfirmation(petId: number): void {
    this.selectedPetIdToDelete = petId;
    this.showConfirmationModal = true;
  }

  closeDeleteConfirmation(): void {
    this.showConfirmationModal = false;
    this.selectedPetIdToDelete = null;
  }

  confirmDelete(): void {
    if (this.selectedPetIdToDelete !== null) {
      this.petService.deletePet(this.selectedPetIdToDelete).subscribe({
        next: () => {
          console.log('Pet deletado com sucesso!');
          this.pets$ = this.petService.getPets();
          this.closeDeleteConfirmation();
        },
        error: (err: any) => {
          console.error('Erro ao deletar pet:', err);
          this.closeDeleteConfirmation();
        }
      });
    }
  }
}
