import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../../../service/article.service';
import { Article } from '../../../models/article';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {
  articleService = inject(ArticleService);
  articles$: Observable<Article[]> | undefined;

  ngOnInit(): void {
    this.articles$ = this.articleService.getArticles();
  }
}