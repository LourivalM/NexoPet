import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../models/post.model';
import { PostService } from '../../service/post.service';
import { CreatePostFormComponent } from '../../components/forms/create-post-form/create-post-form.component';
import { PostCardComponent } from '../../components/card/post-card/post-card.component';
import { UserService } from '../../service/user.service';

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
  postToEdit: Post | null = null;

  constructor(public postService: PostService, public userService: UserService) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  toggleCreateForm(): void {
    this.postToEdit = null;
    this.showCreateForm = !this.showCreateForm;
  }

  onEditPostClick(post: Post): void {
    this.postToEdit = post;
    this.showCreateForm = true;
  }

  handleFormSubmit(postData: any): void {
    if (this.postToEdit) {
      // Modo de Edição
      if (this.postToEdit.id !== undefined) {
        this.postService.updatePost(this.postToEdit.id, postData).subscribe(() => {
          this.showCreateForm = false;
          this.postToEdit = null;
          this.loadPosts();
        });
      }
    } else {
      // Modo de Adição
      const user = this.userService.getUser();
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

  onDeletePost(postId: number): void {
    this.postService.deletePost(postId).subscribe(() => {
      this.loadPosts();
    });
  }

  onPostLiked(updatedPost: Post): void {
    const index = this.posts.findIndex(p => p.id === updatedPost.id);
    if (index !== -1) {
      this.posts[index] = updatedPost;
    }
  }
}
