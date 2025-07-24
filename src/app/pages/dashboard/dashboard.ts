import { Card } from '../../components/card/card';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { DashBoard } from '../../service/dashboard';
import { Pet } from '../../models/pet';
import { UserService } from '../../service/user.service';
import { PetService } from '../../service/pet.service';
import { Router } from '@angular/router'; // Importar Router

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, Card],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit{
  dashboardService = inject(DashBoard)
  userService = inject(UserService)
  petService = inject(PetService)
  router = inject(Router); // Injetar Router

  userType: 'pessoa' | 'ong' | 'parceiro' | null = null;

  pets: Pet[] = []
  
  petSelected: Pet = {
    id: -1,
    nome: '',
    especie: '',
    raca: '',
    idade: '',
    ong: '',
    img: ''
  }

  ngOnInit() {
    this.userType = this.userService.getUser()?.tipo || null;

    this.dashboardService.getPets().subscribe({
      error: (err: any) => {
        console.error('Erro ao buscar pets:', err);
      },
      next: (pets) => {
        this.pets = pets;
        console.log('Pets recebidos:', this.pets);
        
        if (this.pets.length > 0) {
          this.petSelected = this.pets[0];
        }
        console.log('Pets após atribuição:', this.pets);
        console.log('Pet selecionado após atribuição:', this.petSelected);
      }
    })
  }

  selectPet(pet: Pet) {
    this.petSelected = pet;
  }

  onAdoptClick(): void {
    if (this.petSelected && this.petSelected.id !== -1) {
      const updatedPet: Pet = { ...this.petSelected, adoptionStatus: 'pending' };
      this.petService.updatePet(updatedPet.id!, updatedPet, null).subscribe({
        next: () => {
          alert('Sua solicitação foi enviada à ONG responsável. Ela entrará em contato em breve!');
          this.pets = this.pets.map(p => p.id === updatedPet.id ? updatedPet : p);
          this.petSelected = updatedPet;
        },
        error: (err: any) => {
          console.error('Erro ao solicitar adoção:', err);
          alert('Ocorreu um erro ao enviar sua solicitação. Tente novamente.');
        }
      });
    }
  }

  onCancelAdoptClick(): void {
    if (this.petSelected && this.petSelected.id !== -1) {
      const updatedPet: Pet = { ...this.petSelected, adoptionStatus: 'available' };
      this.petService.updatePet(updatedPet.id!, updatedPet, null).subscribe({
        next: () => {
          alert('Solicitação de adoção cancelada com sucesso!');
          this.pets = this.pets.map(p => p.id === updatedPet.id ? updatedPet : p);
          this.petSelected = updatedPet;
        },
        error: (err: any) => {
          console.error('Erro ao cancelar solicitação de adoção:', err);
          alert('Ocorreu um erro ao cancelar sua solicitação. Tente novamente.');
        }
      });
    }
  }

  goToPetManagement(): void {
    this.router.navigate(['/ong/pet-management']);
  }

  handleAdoptionStatusChange(updatedPet: Pet): void {
    this.pets = this.pets.map(p => p.id === updatedPet.id ? updatedPet : p);
  }
}
