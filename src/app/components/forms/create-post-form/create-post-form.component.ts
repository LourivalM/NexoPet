import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ImageSelectorModalComponent } from '../../modals/image-selector-modal.component';

@Component({
  selector: 'app-create-post-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ImageSelectorModalComponent],
  templateUrl: './create-post-form.component.html',
  styleUrls: ['./create-post-form.component.css']
})
export class CreatePostFormComponent implements OnInit {
  @Output() formSubmit = new EventEmitter<any>();
  postForm: FormGroup;
  showImageSelector = false;

  constructor(private fb: FormBuilder) {
    this.postForm = this.fb.group({
      imageUrl: ['', Validators.required],
      caption: ['']
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.postForm.valid) {
      this.formSubmit.emit(this.postForm.value);
    }
  }

  openImageSelector(): void {
    this.showImageSelector = true;
  }

  onImageSelected(imageName: string): void {
    this.postForm.patchValue({ imageUrl: imageName });
    this.showImageSelector = false;
  }

  onCloseImageSelector(): void {
    this.showImageSelector = false;
  }
}
