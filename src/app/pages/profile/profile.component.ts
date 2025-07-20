import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { loginService } from '../../service/login';
import { Usuario } from '../../models/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  authService = inject(loginService);
  currentUser: Usuario | null = null;

  ngOnInit(): void {
    this.currentUser = this.authService.getUser();
  }
}
