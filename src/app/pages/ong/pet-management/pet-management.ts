import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { PetService } from '../../../service/pet.service';
import { Pet } from '../../../models/pet';
import { PetFormComponent } from '../../../components/forms/pet-form/pet-form';
import { loginService } from '../../../service/login';

@Component({
  selector: 'app-pet-management',
  standalone: true,
  imports: [CommonModule, PetFormComponent],
  templateUrl: './pet-management.html',
  styleUrls: ['./pet-management.css']
})
export class PetManagementComponent implements OnInit {
  pets$!: Observable<Pet[]>;
  showPetForm: boolean = false;

  constructor(private petService: PetService, private loginService: loginService) { }

  ngOnInit(): void {
    this.pets$ = this.petService.getPets();
  }

  onAddNewPetClick(): void {
    console.log('Botão "Adicionar Novo Pet" clicado.');
    this.showPetForm = true;
  }

  handlePetFormSubmit(pet: Pet): void {
    console.log('handlePetFormSubmit: Submetendo pet:', pet);
    const currentUser = this.loginService.getUser();
    if (currentUser && currentUser.tipo === 'ong') {
      pet.ong = currentUser.nickname || currentUser.nomeInstituicao || ''; // Atribui o nickname ou nome da instituição da ONG
      this.petService.addPet(pet).subscribe(() => {
        console.log('Pet adicionado com sucesso. Recarregando pets.');
        this.showPetForm = false;
        this.pets$ = this.petService.getPets(); // Recarrega a lista de pets após adicionar um novo
      });
    } else {
      console.error('Usuário não é uma ONG ou não está logado.');
    }
  }
}
