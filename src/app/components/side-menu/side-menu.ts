import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { Usuario } from '../../models/user';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './side-menu.html',
  styleUrls: ['./side-menu.css']
})
export class SideMenu implements OnInit {
  userService = inject(UserService);
  router = inject(Router);
  user: Usuario | null = null;

  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  isLoggedIn(): boolean {
    return !!this.user;
  }

  getUserType(): 'pessoa' | 'ong' | 'parceiro' | null {
    return this.user?.tipo || null;
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/home']);
  }
}
