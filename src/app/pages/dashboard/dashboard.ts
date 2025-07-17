import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Card } from '../../components/card/card';
import { PetDetails } from '../../components/pet-details/pet-details';
import { DashBoard } from '../../service/dashboard';
import { Pet } from '../../models/pet';

import { loginService } from '../../service/login';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, Card, PetDetails],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit{
  dashboardService = inject(DashBoard)
  loginService = inject(loginService)

  userType: 'pessoa' | 'ong' | null = null;

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
    this.userType = this.loginService.getUserType();

    this.dashboardService.getPets().subscribe({
      error: (err) => {
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

  onChangeSelect(event: Event) {
    const id = Number((event.target as HTMLSelectElement).value);
    const pet = this.pets.find((p) => p.id === id);
    if (pet) {
      this.petSelected = pet;
    }
  }
}
