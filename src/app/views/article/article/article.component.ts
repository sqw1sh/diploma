import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ArticleService } from 'src/app/shared/services/article.service';
import { CommentService } from 'src/app/shared/services/comment.service';
import { ArticleType } from 'src/app/types/article.type';
import { CommentsType } from 'src/app/types/comments.type';
import { DefaultResponseType } from 'src/app/types/default-response.type';
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
  public isLogged: boolean = false;
  public comments: CommentsType | null = null;
  public commentInput: string = '';

  constructor(
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private commentService: CommentService
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

            this.processComment(0);
          });
      }
    });

    this.isLogged = this.authService.isLogged;
    this.authService.isLogged$.subscribe((logged) => {
      this.isLogged = logged;
    });
  }

  private processComment(offset: number): void {
    this.comments = null;

    this.commentService
      .getComments(offset, this.article.id)
      .subscribe((commentsData: CommentsType) => {
        this.comments = commentsData;
      });
  }

  public addComment(): void {
    if (this.commentInput) {
      this.commentService
        .addComment(this.commentInput, this.article.id)
        .subscribe((data: DefaultResponseType) => {
          if (data.error) {
            throw new Error(data.message);
          }

          this.processComment(0);
        });
    }
  }
}
