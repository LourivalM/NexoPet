import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetService } from '../../service/pet.service';
import { Pet } from '../../models/pet';
import { Card } from '../../components/card/card'; // Importar o componente Card

@Component({
  selector: 'app-pet-gallery',
  standalone: true,
  imports: [CommonModule, Card],
  templateUrl: './pet-gallery.component.html',
  styleUrl: './pet-gallery.component.css'
})
export class PetGalleryComponent implements OnInit {
  pets: Pet[] = [];
  private petService = inject(PetService);

  ngOnInit(): void {
    this.petService.loadPets(); // Carrega os pets no serviço
    this.petService.pets$.subscribe(pets => {
      this.pets = pets;
    });
  }

  loadPets(): void {
    // Este método não é mais necessário aqui, pois a lógica de carregamento está no PetService
  }
}
