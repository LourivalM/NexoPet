import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Photo {
  id: number;
  imageUrl: string;
}

@Component({
  selector: 'app-my-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-gallery.component.html',
  styleUrl: './my-gallery.component.css'
})
export class MyGalleryComponent implements OnInit {
  photos: Photo[] = [];

  ngOnInit(): void {
    this.loadExamplePhotos();
  }

  loadExamplePhotos(): void {
    // Example photos - replace with actual data fetching
    this.photos = [
      { id: 1, imageUrl: 'https://via.placeholder.com/300x200?text=Minha+Foto+1' },
      { id: 2, imageUrl: 'https://via.placeholder.com/300x200?text=Minha+Foto+2' },
      { id: 3, imageUrl: 'https://via.placeholder.com/300x200?text=Minha+Foto+3' },
      { id: 4, imageUrl: 'https://via.placeholder.com/300x200?text=Minha+Foto+4' },
    ];
  }

  deletePhoto(photoId: number): void {
    console.log(`Deletando foto com ID: ${photoId}`);
    // Implement actual deletion logic (e.g., API call)
    this.photos = this.photos.filter(photo => photo.id !== photoId);
  }
}