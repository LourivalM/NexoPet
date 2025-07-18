import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPessoaFormComponent } from '../register-pessoa-form/register-pessoa-form';
import { RegisterOngFormComponent } from '../register-ong-form/register-ong-form';
import { RegisterParceiroFormComponent } from '../register-parceiro-form/register-parceiro-form';

@Component({
  selector: 'app-register-selection',
  standalone: true,
  imports: [CommonModule, RegisterPessoaFormComponent, RegisterOngFormComponent, RegisterParceiroFormComponent],
  templateUrl: './register-selection.html',
  styleUrl: './register-selection.css'
})
export class RegisterSelectionComponent {
  @Output() closeSelection = new EventEmitter<void>();

  selectedForm: 'pessoa' | 'ong' | 'parceiro' | null = null;

  selectForm(type: 'pessoa' | 'ong' | 'parceiro'): void {
    this.selectedForm = type;
  }

  onFormSubmitted(event: any): void {
    console.log('Formulário enviado:', event);
    // Aqui você pode adicionar lógica para fechar o modal ou redirecionar
    this.closeSelection.emit();
  }

  onClose(): void {
    this.closeSelection.emit();
  }

  goBackToSelection(): void {
    this.selectedForm = null;
  }
}