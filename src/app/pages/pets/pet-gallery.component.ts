import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetService } from '../../service/pet.service';
import { Pet } from '../../models/pet';

@Component({
  selector: 'app-pet-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pet-gallery.component.html',
  styleUrl: './pet-gallery.component.css'
})
export class PetGalleryComponent implements OnInit {
  pets: Pet[] = [];
  private petService = inject(PetService);

  ngOnInit(): void {
    this.loadPets();
  }

  loadPets(): void {
    this.petService.getPets().subscribe(pets => {
      this.pets = pets;
    });
  }
}
