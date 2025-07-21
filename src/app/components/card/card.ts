import { Component, Input, inject } from '@angular/core';
import { Pet } from '../../models/pet';
import { CommonModule } from '@angular/common';
import { loginService } from '../../service/login';
import { PetService } from '../../service/pet.service';
import { ConfirmationModalComponent } from '../modals/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, ConfirmationModalComponent],
  templateUrl: './card.html',
  styleUrls: ['./card.css']
})
export class Card {
  @Input() pet: Pet | undefined;

  loginService = inject(loginService);
  petService = inject(PetService);

  showConfirmationModal: boolean = false;

  get isLoggedIn(): boolean {
    return !!this.loginService.getUser();
  }

  get userType(): string | undefined {
    return this.loginService.getUser()?.tipo;
  }

  // Verifica se o pet pertence à ONG logada (assumindo que pet.ong é o nickname da ONG)
  isMyPet(): boolean {
    const loggedInUser = this.loginService.getUser();
    return this.pet?.ong === loggedInUser?.nickname && loggedInUser?.tipo === 'ong';
  }

  openDeleteConfirmation(): void {
    this.showConfirmationModal = true;
  }

  closeDeleteConfirmation(): void {
    this.showConfirmationModal = false;
  }

  confirmDelete(): void {
    if (this.pet && this.pet.id) {
      this.petService.deletePet(this.pet.id).subscribe({
        next: () => {
          console.log('Pet deletado com sucesso!');
          // TODO: Emitir evento para o componente pai recarregar a lista de pets
          this.closeDeleteConfirmation();
        },
        error: (err) => {
          console.error('Erro ao deletar pet:', err);
          this.closeDeleteConfirmation();
        }
      });
    }
  }
}
