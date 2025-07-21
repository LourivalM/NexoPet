import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ProductService } from '../../../service/product.service';
import { Product } from '../../../models/product.model';
import { ProductFormComponent } from '../../../components/forms/product-form/product-form';
import { loginService } from '../../../service/login';
import { ConfirmationModalComponent } from '../../../components/modals/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule, ProductFormComponent, ConfirmationModalComponent],
  templateUrl: './product-management.html',
  styleUrls: ['./product-management.css']
})
export class ProductManagementComponent implements OnInit {
  products$!: Observable<Product[]>;
  showProductForm: boolean = false;
  showConfirmationModal: boolean = false;
  selectedProductIdToDelete: number | null = null;

  constructor(private productService: ProductService, private loginService: loginService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.products$ = this.productService.getProducts();
  }

  onAddNewProductClick(): void {
    this.showProductForm = true;
  }

  handleProductFormSubmit(product: Product): void {
    const currentUser = this.loginService.getUser();
    if (currentUser && currentUser.tipo === 'parceiro') {
      product.partnerId = currentUser.id; // Atribui o ID do parceiro logado
      this.productService.addProduct(product).subscribe(() => {
        this.showProductForm = false;
        this.loadProducts(); // Recarrega a lista de produtos após adicionar um novo
      });
    } else {
      console.error('Usuário não é um parceiro ou não está logado.');
    }
  }

  openDeleteConfirmation(productId: number): void {
    this.selectedProductIdToDelete = productId;
    this.showConfirmationModal = true;
  }

  closeDeleteConfirmation(): void {
    this.showConfirmationModal = false;
    this.selectedProductIdToDelete = null;
  }

  confirmDelete(): void {
    if (this.selectedProductIdToDelete !== null) {
      this.productService.deleteProduct(this.selectedProductIdToDelete).subscribe({
        next: () => {
          console.log('Produto deletado com sucesso!');
          this.loadProducts(); // Recarrega a lista de produtos após deletar
          this.closeDeleteConfirmation();
        },
        error: (err: any) => {
          console.error('Erro ao deletar produto:', err);
          this.closeDeleteConfirmation();
        }
      });
    }
  }

  isMyProduct(product: Product): boolean {
    const loggedInUser = this.loginService.getUser();
    return loggedInUser?.tipo === 'parceiro' && product.partnerId === loggedInUser?.id;
  }
}
