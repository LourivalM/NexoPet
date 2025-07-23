import { Component, Input, Output, EventEmitter, inject, HostBinding } from '@angular/core';
import { Pet } from '../../models/pet';
import { CommonModule } from '@angular/common';
import { UserService } from '../../service/user.service';
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
  @Input() context: 'home' | 'default' = 'default';
  @Output() cardClick = new EventEmitter<Pet>();
  @Output() adoptionStatusChanged = new EventEmitter<Pet>();

  @HostBinding('class.home-view')
  get isHomeView() {
    return this.context === 'home';
  }

  userService = inject(UserService);
  petService = inject(PetService);

  showConfirmationModal: boolean = false;

  get isLoggedIn(): boolean {
    return !!this.userService.getUser();
  }

  get userType(): string | undefined {
    return this.userService.getUser()?.tipo;
  }

  // Verifica se o pet pertence à ONG logada (assumindo que pet.ong é o nickname da ONG)
  isMyPet(): boolean {
    const loggedInUser = this.userService.getUser();
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

  onCardClick(): void {
    if (this.pet) {
      this.cardClick.emit(this.pet);
    }
  }

  onAdoptClick(): void {
    if (this.pet && this.pet.id !== -1) {
      const updatedPet: Pet = { ...this.pet, adoptionStatus: 'pending' };
      this.petService.updatePet(updatedPet.id!, updatedPet).subscribe({
        next: () => {
          alert('Sua solicitação foi enviada à ONG responsável. Ela entrará em contato em breve!');
          this.adoptionStatusChanged.emit(updatedPet);
        },
        error: (err: any) => {
          console.error('Erro ao solicitar adoção:', err);
          alert('Ocorreu um erro ao enviar sua solicitação. Tente novamente.');
        }
      });
    }
  }

  onCancelAdoptClick(): void {
    if (this.pet && this.pet.id !== -1) {
      const updatedPet: Pet = { ...this.pet, adoptionStatus: 'available' };
      this.petService.updatePet(updatedPet.id!, updatedPet).subscribe({
        next: () => {
          alert('Solicitação de adoção cancelada com sucesso!');
          this.adoptionStatusChanged.emit(updatedPet);
        },
        error: (err: any) => {
          console.error('Erro ao cancelar solicitação de adoção:', err);
          alert('Ocorreu um erro ao cancelar sua solicitação. Tente novamente.');
        }
      });
    }
  }
}
