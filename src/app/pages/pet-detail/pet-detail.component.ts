import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PetService } from '../../service/pet.service';
import { Pet } from '../../models/pet';

@Component({
  selector: 'app-pet-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pet-detail.component.html',
  styleUrls: ['./pet-detail.component.css']
})
export class PetDetailComponent implements OnInit {
  pet: Pet | undefined;
  private route = inject(ActivatedRoute);
  private petService = inject(PetService);

  ngOnInit(): void {
    const petId = Number(this.route.snapshot.paramMap.get('id'));
    if (petId) {
      this.petService.pets$.subscribe(pets => {
        this.pet = pets.find((p: Pet) => p.id === petId);
      });
      this.petService.loadPets(); // Garante que os pets sejam carregados
    }
  }
}
