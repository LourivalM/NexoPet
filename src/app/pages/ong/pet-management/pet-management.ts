import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { PetService } from '../../../service/pet.service';
import { Pet } from '../../../models/pet';
import { PetFormComponent } from '../../../components/forms/pet-form/pet-form';
import { loginService } from '../../../service/login';
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

  constructor(private petService: PetService, private loginService: loginService) { }

  ngOnInit(): void {
    this.pets$ = this.petService.getPets();
  }

  onAddNewPetClick(): void {
    console.log('Botão "Adicionar Novo Pet" clicado.');
    this.showPetForm = true;
  }

  handlePetFormSubmit(pet: Pet): void {
    console.log('handlePetFormSubmit: Submetendo pet:', pet);
    const currentUser = this.loginService.getUser();
    if (currentUser && currentUser.tipo === 'ong') {
      pet.ong = currentUser.nickname || currentUser.nomeInstituicao || ''; // Atribui o nickname ou nome da instituição da ONG
      this.petService.addPet(pet).subscribe(() => {
        console.log('Pet adicionado com sucesso. Recarregando pets.');
        this.showPetForm = false;
        this.pets$ = this.petService.getPets(); // Recarrega a lista de pets após adicionar um novo
      });
    } else {
      console.error('Usuário não é uma ONG ou não está logado.');
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
          this.pets$ = this.petService.getPets(); // Recarrega a lista de pets após deletar
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
