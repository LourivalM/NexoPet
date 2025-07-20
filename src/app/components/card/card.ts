import { Component, Input } from '@angular/core';
import { Pet } from '../../models/pet';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrls: ['./card.css']
})
export class Card {
  @Input() pet: Pet | undefined;
}
