import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ProductService } from '../../../service/product.service';
import { Product } from '../../../models/product.model';
import { ProductFormComponent } from '../../../components/forms/product-form/product-form'; // Será criado posteriormente
import { loginService } from '../../../service/login';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule, ProductFormComponent],
  templateUrl: './product-management.html',
  styleUrls: ['./product-management.css']
})
export class ProductManagementComponent implements OnInit {
  products$!: Observable<Product[]>;
  showProductForm: boolean = false;

  constructor(private productService: ProductService, private loginService: loginService) { }

  ngOnInit(): void {
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
        this.products$ = this.productService.getProducts(); // Recarrega a lista de produtos após adicionar um novo
      });
    } else {
      console.error('Usuário não é um parceiro ou não está logado.');
    }
  }
}
