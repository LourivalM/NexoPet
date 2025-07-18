import { Component, EventEmitter, Output, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lgpd-terms-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lgpd-terms-modal.html',
  styleUrl: './lgpd-terms-modal.css'
})
export class LgpdTermsModalComponent implements AfterViewInit {
  @Output() closeModal = new EventEmitter<void>();
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  ngAfterViewInit(): void {
    // No longer checking scroll to end
  }

  onClose(): void {
    this.closeModal.emit();
  }
}