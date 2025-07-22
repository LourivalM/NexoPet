import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Pet } from '../../../../app/models/pet';
import { ImageSelectorModalComponent } from '../../modals/image-selector-modal.component'; // Importar o modal

@Component({
  selector: 'app-pet-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ImageSelectorModalComponent], // Adicionar o modal aos imports
  templateUrl: './pet-form.html',
  styleUrls: ['./pet-form.css']
})
export class PetFormComponent implements OnInit, OnChanges {
  @Input() initialData: Pet | null = null;
  @Output() formSubmit = new EventEmitter<Pet>();

  petForm: FormGroup;
  showImageSelectorModal: boolean = false;
  selectedImage: string | null = null;

  constructor(private fb: FormBuilder) {
    this.petForm = this.fb.group({
      id: [0],
      nome: ['', Validators.required],
      especie: ['', Validators.required],
      raca: ['', Validators.required],
      idade: ['', Validators.required],
      img: ['', Validators.required] // O campo img agora será preenchido pelo seletor
    });
  }

  ngOnInit(): void {
    // No ngOnInit, pois ngOnChanges já lidará com initialData
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData'] && this.initialData) {
      this.petForm.patchValue(this.initialData);
      if (this.initialData.img) {
        this.selectedImage = this.initialData.img;
      }
    }
  }

  openImageSelector(): void {
    this.showImageSelectorModal = true;
  }

  closeImageSelector(): void {
    this.showImageSelectorModal = false;
  }

  onImageSelected(imageName: string): void {
    this.selectedImage = imageName;
    this.petForm.get('img')?.setValue(imageName);
    this.closeImageSelector();
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
