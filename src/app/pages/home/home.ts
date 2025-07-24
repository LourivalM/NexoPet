import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PetService } from '../../service/pet.service';
import { PostService } from '../../service/post.service';
import { OngService } from '../../service/ong.service'; // Importar OngService
import { PartnerService } from '../../service/partner.service'; // Importar PartnerService
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pet } from '../../models/pet';
import { Post } from '../../models/post.model';
import { Ong } from '../../models/ong'; // Importar modelo Ong
import { Partner } from '../../models/partner'; // Importar modelo Partner
import { Card } from '../../components/card/card';
import { PostCardComponent } from '../../components/card/post-card/post-card.component';
import { UserService } from '../../service/user.service';
import { Usuario } from '../../models/user';

@Component({
  selector: 'app-home',
  imports: [CommonModule, Card, PostCardComponent, RouterLink],
  standalone: true,
  providers: [],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  petService = inject(PetService);
  postService = inject(PostService);
  ongService = inject(OngService); // Injetar OngService
  partnerService = inject(PartnerService); // Injetar PartnerService

  pets$: Observable<Pet[]> | undefined;
  posts$: Observable<Post[]> | undefined;
  ongs$: Observable<Ong[]> | undefined; // Usar modelo Ong
  parceiros$: Observable<Partner[]> | undefined; // Usar modelo Partner

  ngOnInit(): void {
    this.petService.loadPets(); // Carrega os pets no serviço
    this.pets$ = this.petService.pets$; // Assina o BehaviorSubject do serviço
    this.posts$ = this.postService.getPosts().pipe(
      map(posts => posts.slice(0, 4))
    );

    this.ongs$ = this.ongService.getOngs().pipe(
      map(ongs => ongs.slice(0, 5)) // Limitar a 5 ONGs
    );

    this.parceiros$ = this.partnerService.getPartners().pipe(
      map(partners => partners.slice(0, 5)) // Limitar a 5 Parceiros
    );
  }
}