import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetService } from '../../service/pet.service';
import { PostService } from '../../service/post.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pet } from '../../models/pet';
import { Post } from '../../models/post.model';
import { Card } from '../../components/card/card';
import { PostCardComponent } from '../../components/card/post-card/post-card.component';
import { UserService } from '../../service/user.service';
import { Usuario } from '../../models/user';

@Component({
  selector: 'app-home',
  imports: [CommonModule, Card, PostCardComponent],
  standalone: true,
  providers: [],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  petService = inject(PetService);
  postService = inject(PostService);
  userService = inject(UserService);

  pets$: Observable<Pet[]> | undefined;
  posts$: Observable<Post[]> | undefined;
  ongs$: Observable<Usuario[]> | undefined;
  parceiros$: Observable<Usuario[]> | undefined;

  ngOnInit(): void {
    this.pets$ = this.petService.getPets();
    this.posts$ = this.postService.getPosts().pipe(
      map(posts => posts.slice(0, 4))
    );

    const users$ = this.userService.getUsers();

    this.ongs$ = users$.pipe(
      map(users => users.filter(user => user.tipo === 'ong').slice(0, 5))
    );

    this.parceiros$ = users$.pipe(
      map(users => users.filter(user => user.tipo === 'parceiro').slice(0, 5))
    );
  }
}