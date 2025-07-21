import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OngService } from '../../service/ong.service';
import { Ong } from '../../models/ong';

@Component({
  selector: 'app-ong-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ong-list.component.html',
  styleUrl: './ong-list.component.css'
})
export class OngListComponent implements OnInit {
  ongs: Ong[] = [];

  constructor(private ongService: OngService) { }

  ngOnInit(): void {
    this.ongService.getOngs().subscribe(ongs => {
      this.ongs = ongs;
    });
  }
}
