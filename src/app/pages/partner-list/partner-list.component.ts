import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnerService } from '../../service/partner.service';
import { Partner } from '../../models/partner';

@Component({
  selector: 'app-partner-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partner-list.component.html',
  styleUrl: './partner-list.component.css'
})
export class PartnerListComponent implements OnInit {
  partners: Partner[] = [];

  constructor(private partnerService: PartnerService) { }

  ngOnInit(): void {
    this.partnerService.getPartners().subscribe(partners => {
      this.partners = partners;
    });
  }
}
