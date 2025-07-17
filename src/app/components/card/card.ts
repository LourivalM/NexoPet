import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card {

  @Input()  title: string = '';
  @Input()  valor: number | string = 0;
  

}
