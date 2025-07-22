import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class Menu {
  userService = inject(UserService);
  router = inject(Router);

  isLoggedIn(): boolean {
    return !!this.userService.getUser();
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/home']);
  }
}