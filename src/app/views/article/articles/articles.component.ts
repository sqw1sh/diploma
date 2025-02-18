import { Component, HostListener, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/shared/services/article.service';
import { ArticlesType } from 'src/app/types/articles.type';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  public isFilterMenuOpen: boolean = false;
  public pages: number[] = [];
  public currentPage: number = 1;
  public articles: ArticlesType | null = null;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService
      .getArticles(this.currentPage)
      .subscribe((data: ArticlesType) => {
        this.articles = data;

        for (let i = 1; i <= this.articles.pages; i++) {
          this.pages.push(i);
        }
      });
  }

  public changeFilterMenuCondition(): void {
    this.isFilterMenuOpen = !this.isFilterMenuOpen;
  }

  public openPage(page: number): void {
    if (page >= 1 && page <= this.pages.length) {
      this.currentPage = page;
    }
  }
}
