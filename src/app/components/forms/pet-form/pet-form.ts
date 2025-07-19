import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Pet } from '../../../../app/models/pet';

@Component({
  selector: 'app-pet-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pet-form.html',
  styleUrls: ['./pet-form.css']
})
export class PetFormComponent implements OnInit, OnChanges {
  @Input() initialData: Pet | null = null;
  @Output() formSubmit = new EventEmitter<Pet>();

  petForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.petForm = this.fb.group({
      id: [0],
      nome: ['', Validators.required],
      especie: ['', Validators.required],
      raca: ['', Validators.required],
      idade: ['', Validators.required],
      ong: ['', Validators.required],
      img: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // No ngOnInit, pois ngOnChanges já lidará com initialData
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData'] && this.initialData) {
      this.petForm.patchValue(this.initialData);
    }
  }

  onSubmit(): void {
    if (this.petForm.valid) {
      this.formSubmit.emit(this.petForm.value);
    } else {
      // Opcional: Adicionar lógica para exibir erros de validação
      console.log('Formulário inválido');
    }
  }
}
