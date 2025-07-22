import { Component, EventEmitter, OnInit, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Post } from '../../../../app/models/post.model';

@Component({
  selector: 'app-create-post-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-post-form.component.html',
  styleUrls: ['./create-post-form.component.css']
})
export class CreatePostFormComponent implements OnInit, OnChanges {
  @Input() initialData: Post | null = null;
  @Output() formSubmit = new EventEmitter<Post>();
  postForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.postForm = this.fb.group({
      id: [0],
      title: ['', Validators.required],
      content: ['', Validators.required],
      imageUrl: [''],
      userId: [0],
      likes: [0],
      createdAt: [new Date()]
    });
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData'] && this.initialData) {
      this.postForm.patchValue(this.initialData);
    }
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      this.formSubmit.emit(this.postForm.value);
    }
  }
}
