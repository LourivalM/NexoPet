import { Component, EventEmitter, Output, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lgpd-terms-modal',
  templateUrl: './lgpd-terms-modal.html',
  styleUrls: ['./lgpd-terms-modal.css'],
  standalone: true,
  imports: [CommonModule]
})
export class LgpdTermsModalComponent implements AfterViewInit {
  @Output() closeModal = new EventEmitter<void>();
  @Output() termsAccepted = new EventEmitter<void>();
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  ngAfterViewInit(): void {
    // No longer checking scroll to end
  }

  onClose(): void {
    this.closeModal.emit();
  }

  onAccept(): void {
    this.termsAccepted.emit();
    this.closeModal.emit();
  }
}