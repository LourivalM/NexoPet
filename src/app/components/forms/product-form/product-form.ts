import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../../../app/models/product.model';
import { ProductService } from '../../../service/product.service';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.css']
})
export class ProductFormComponent implements OnInit, OnChanges {
  @Input() initialData: Product | null = null;
  @Output() formSubmit = new EventEmitter<{ product: Product, file: File | null }>();

  productForm: FormGroup;
  selectedFile: File | null = null;
  selectedImage: string | null = null;

  private productService = inject(ProductService);

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      partnerId: [0, Validators.required],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    // No ngOnInit, pois ngOnChanges já lidará com initialData
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData'] && this.initialData) {
      this.productForm.patchValue(this.initialData);
      if (this.initialData.imageUrl) {
        this.selectedImage = this.initialData.imageUrl;
      }
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value;

      let submitObservable: Observable<Product>;

      if (this.initialData && this.initialData.id) {
        // Modo de Edição
        submitObservable = this.productService.updateProduct(this.initialData.id, productData, this.selectedFile);
      } else {
        // Modo de Adição
        submitObservable = this.productService.addProduct(productData, this.selectedFile);
      }

      submitObservable.subscribe({
        next: (product: Product) => {
          this.formSubmit.emit({ product: product, file: this.selectedFile });
          this.selectedFile = null; // Limpa o arquivo selecionado
        },
        error: (err: any) => {
          console.error('Erro ao salvar produto:', err);
          alert('Erro ao salvar produto. Tente novamente.');
        }
      });

    } else {
      console.log('Formulário de produto inválido');
    }
  }
}
