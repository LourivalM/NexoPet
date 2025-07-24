import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Pet } from '../../../../app/models/pet';
import { PetService } from '../../../service/pet.service';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-pet-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pet-form.html',
  styleUrls: ['./pet-form.css']
})
export class PetFormComponent implements OnInit, OnChanges {
  @Input() initialData: Pet | null = null;
  @Output() formSubmit = new EventEmitter<{ pet: Pet, file: File | null }>();

  petForm: FormGroup;
  selectedImage: string | null = null;
  selectedFile: File | null = null;

  private petService = inject(PetService);

  constructor(private fb: FormBuilder) {
    this.petForm = this.fb.group({
      id: [0],
      nome: ['', Validators.required],
      especie: ['', Validators.required],
      raca: ['', Validators.required],
      idade: ['', Validators.required],
      img: ['', Validators.required]
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

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.petForm.get('img')?.setValue(file.name); // Define o valor do form control
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.petForm.valid) {
      const petData = this.petForm.value;

      let submitObservable: Observable<Pet>;

      if (this.initialData && this.initialData.id) {
        // Modo de Edição
        submitObservable = this.petService.updatePet(this.initialData.id, petData, this.selectedFile);
      } else {
        // Modo de Adição
        submitObservable = this.petService.addPet(petData, this.selectedFile);
      }

      submitObservable.subscribe({
        next: (pet: Pet) => {
          this.formSubmit.emit({ pet: pet, file: this.selectedFile });
          this.selectedFile = null; // Limpa o arquivo selecionado
        },
        error: (err: any) => {
          console.error('Erro ao salvar pet:', err);
          alert('Erro ao salvar pet. Tente novamente.');
        }
      });

    } else {
      console.log('Formulário inválido');
    }
  }
}
