import { Component, Input } from '@angular/core';
import { Pet } from '../../models/pet';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pet-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pet-details.html',
  styleUrls: ['./pet-details.css']
})
export class PetDetails {
  @Input() pet: Pet | null = null;
}
