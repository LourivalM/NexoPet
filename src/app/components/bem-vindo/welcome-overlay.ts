import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome-overlay.html',
  styleUrl: './welcome-overlay.css'
})
export class WelcomeOverlay implements OnInit {
  @Input() message: string = 'Bem Vindo!';
  @Output() closed = new EventEmitter<void>();

  isVisible: boolean = false;

  ngOnInit(): void {
    this.isVisible = true;
  }

  closeOverlay(): void {
    this.isVisible = false;
    this.closed.emit();
  }
}
