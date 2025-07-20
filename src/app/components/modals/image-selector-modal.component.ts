import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageSelectorService } from '../../service/image-selector.service';

@Component({
  selector: 'app-image-selector-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-selector-modal.component.html',
  styleUrls: ['./image-selector-modal.component.css']
})
export class ImageSelectorModalComponent implements OnInit {
  @Output() imageSelected = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();

  imageSelectorService = inject(ImageSelectorService);

  availableImages: string[] = [];
  selectedImage: string | null = null;

  ngOnInit(): void {
    this.availableImages = this.imageSelectorService.getAvailableImages();
  }

  selectImage(imageName: string): void {
    this.selectedImage = imageName;
  }

  confirmSelection(): void {
    if (this.selectedImage) {
      this.imageSelected.emit(this.selectedImage);
    }
  }

  closeModal(): void {
    this.close.emit();
  }
}
