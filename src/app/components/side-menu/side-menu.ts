import { Component, inject, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { loginService } from '../../service/login';
import { Usuario } from '../../models/user';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-menu.html',
  styleUrls: ['./side-menu.css']
})
export class SideMenuComponent implements OnInit {
  loginService = inject(loginService);
  user: Usuario | null = null;

  @Input() isOpen: boolean = false; // Changed to Input
  @Output() menuToggled = new EventEmitter<boolean>(); // New Output

  ngOnInit(): void {
    this.user = this.loginService.getUser();
  }

  toggle(): void {
    this.isOpen = !this.isOpen; // Still toggles internal state
    this.menuToggled.emit(this.isOpen); // Emit the new state
  }
}
