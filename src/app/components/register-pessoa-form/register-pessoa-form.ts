import { Component, OnInit, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LgpdTermsModalComponent } from '../lgpd-terms-modal/lgpd-terms-modal';
import { PhoneMaskDirective } from '../../shared/directives/phone-mask.directive';
import { HttpClient } from '@angular/common/http'; // Importar HttpClient

@Component({
  selector: 'app-register-pessoa-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LgpdTermsModalComponent, PhoneMaskDirective],
  templateUrl: './register-pessoa-form.html',
  styleUrl: './register-pessoa-form.css'
})
export class RegisterPessoaFormComponent implements OnInit {
  @Output() formSubmitted = new EventEmitter<any>();

  registerForm!: FormGroup;
  showLgpdModal: boolean = false;
  selectedFile: File | null = null;
  imageUrl: string | ArrayBuffer | null = null;

  private http = inject(HttpClient); // Injetar HttpClient

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nome: ['', Validators.required],
      nickname: ['', Validators.required], // Adicionado o campo nickname
      nomeSocial: [''], // Opcional
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required],
      telefone: ['', Validators.pattern(/^\(\d{2}\)\s\d{4,5}-\d{4}$/)],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      pais: ['', Validators.required],
      lgpdConsent: [false, Validators.requiredTrue]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('senha')?.value === form.get('confirmarSenha')?.value
      ? null : { 'mismatch': true };
  }

  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedFile as Blob);
    } else {
      this.selectedFile = null;
      this.imageUrl = null;
    }
  }

  openLgpdModal(event: Event): void {
    event.preventDefault();
    this.showLgpdModal = true;
  }

  closeLgpdModal(): void {
    this.showLgpdModal = false;
  }

  onLgpdAccepted() {
    this.registerForm.get('lgpdConsent')?.setValue(true);
    this.closeLgpdModal();
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Formulário de Pessoa Física Válido:', this.registerForm.value);
      // Enviar os dados para a API
      this.http.post('http://localhost:3001/register/pessoa', this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Cadastro de Pessoa Física bem-sucedido:', response);
          alert('Cadastro realizado com sucesso!');
          this.formSubmitted.emit(response); // Emitir evento de sucesso
        },
        error: (error) => {
          console.error('Erro no cadastro de Pessoa Física:', error);
          alert('Erro ao cadastrar: ' + (error.error.message || 'Verifique os dados e tente novamente.'));
        }
      });
    } else {
      console.log('Formulário de Pessoa Física Inválido');
      this.registerForm.markAllAsTouched();
    }
  }
}