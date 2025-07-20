import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../models/post.model';
import { PostService } from '../../service/post.service';
import { CreatePostFormComponent } from '../../components/forms/create-post-form/create-post-form.component';
import { PostCardComponent } from '../../components/card/post-card/post-card.component';
import { loginService } from '../../service/login';

@Component({
  selector: 'app-social',
  standalone: true,
  imports: [CommonModule, CreatePostFormComponent, PostCardComponent],
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {
  posts: Post[] = [];
  showCreateForm = false;

  constructor(private postService: PostService, private authService: loginService) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  toggleCreateForm(): void {
    this.showCreateForm = !this.showCreateForm;
  }

  handleFormSubmit(postData: any): void {
    const user = this.authService.getUser();
    if (user) {
      const newPost: Post = {
        ...postData,
        userId: user.id,
        likes: 0,
        createdAt: new Date()
      };

      this.postService.createPost(newPost).subscribe(() => {
        this.showCreateForm = false;
        this.loadPosts();
      });
    }
  }
}
