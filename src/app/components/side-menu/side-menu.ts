import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { loginService } from '../../service/login';
import { Usuario } from '../../models/user';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './side-menu.html',
  styleUrls: ['./side-menu.css']
})
export class SideMenuComponent implements OnInit {
  loginService = inject(loginService);
  user: Usuario | null = null;

  get currentUserType(): 'pessoa' | 'ong' | 'parceiro' | null {
    return this.loginService.getUserType();
  }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
  }
}
