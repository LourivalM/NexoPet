import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { PartnerService } from '../../service/partner.service';
import { Partner } from '../../models/partner';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  partnerId: number;
}

@Component({
  selector: 'app-partner-list',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add FormsModule here
  templateUrl: './partner-list.component.html',
  styleUrl: './partner-list.component.css'
})
export class PartnerListComponent implements OnInit {
  partners: Partner[] = [];
  products: Product[] = []; // All products
  filteredProducts: Product[] = []; // Products to display after filtering
  searchTerm: string = '';

  constructor(private partnerService: PartnerService) { }

  ngOnInit(): void {
    this.partnerService.getPartners().subscribe(partners => {
      this.partners = partners;
    });
    this.loadExampleProducts(); // Load example products
  }

  loadExampleProducts(): void {
    // Example products data
    this.products = [
      { id: 1, name: 'Ração Premium para Cães', description: 'Alimento completo e balanceado para cães adultos.', price: 120.50, partnerId: 1 },
      { id: 2, name: 'Brinquedo Mordedor Resistente', description: 'Ideal para cães com mordida forte.', price: 35.00, partnerId: 1 },
      { id: 3, name: 'Areia Higiênica para Gatos', description: 'Super absorvente e com controle de odor.', price: 45.90, partnerId: 2 },
      { id: 4, name: 'Coleira Antipulgas e Carrapatos', description: 'Proteção eficaz por até 8 meses.', price: 89.90, partnerId: 3 },
      { id: 5, name: 'Shampoo para Gatos Hipoalergênico', description: 'Limpeza suave para peles sensíveis.', price: 29.99, partnerId: 2 },
    ];
    this.filteredProducts = [...this.products]; // Initialize filtered products with all products
  }

  searchProducts(): void {
    if (!this.searchTerm) {
      this.filteredProducts = [...this.products];
      return;
    }
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
