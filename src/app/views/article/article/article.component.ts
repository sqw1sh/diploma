import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/shared/services/article.service';
import { ArticleType } from 'src/app/types/article.type';
import { DetailArticleType } from 'src/app/types/detail-article.type';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  public article!: DetailArticleType;
  public articles: ArticleType[] = [];
  public serverPublicPath = environment.serverPublicPath;

  constructor(
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      if (param['url']) {
        this.articleService
          .getArticle(param['url'])
          .subscribe((articleData: DetailArticleType) => {
            this.article = articleData;

            this.articleService
              .getRelatedArticles(param['url'])
              .subscribe((relatedArticlesData: ArticleType[]) => {
                this.articles = relatedArticlesData;
              });
          });
      }
    });
  }
}
