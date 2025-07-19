import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../../../app/models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.css']
})
export class ProductFormComponent implements OnInit, OnChanges {
  @Input() initialData: Product | null = null;
  @Output() formSubmit = new EventEmitter<Product>();

  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      partnerId: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    // No ngOnInit, pois ngOnChanges já lidará com initialData
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData'] && this.initialData) {
      this.productForm.patchValue(this.initialData);
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.formSubmit.emit(this.productForm.value);
    } else {
      console.log('Formulário de produto inválido');
    }
  }
}
