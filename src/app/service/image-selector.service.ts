import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageSelectorService {

  constructor() { }

  getAvailableImages(): string[] {
    return [
      'BibiFêmea7anos.jpg',
      'Carol e Catarina 3 anos 1.jpg',
      'Carol e Catarina 3 anos 2.jpg',
      'Carol e Catarina 3 anos 3.jpg',
      'MaiadoMacho7anos.jpg',
      'Merendinha - Maria 1.jpg',
      'Merendinha - Maria 10.jpg',
      'Merendinha - Maria 11.jpg',
      'Merendinha - Maria 2.jpg',
      'Merendinha - Maria 3.jpg',
      'Merendinha - Maria 5.jpg',
      'Merendinha - Maria 6.jpg',
      'Merendinha - Maria 7.jpg',
      'Merendinha - Maria 8.jpg',
      'Merendinha - Maria 9.jpg',
      'Merendinha - Maria4.jpg',
      'MimosaFêmea11anos.jpg',
      'Napoelao1 anomacho.jpg',
      'NoahShitzu6Anos1.jpg',
      'NoahShitzu6Anos2.jpg'
    ];
  }
}
