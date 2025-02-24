import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ArticleService } from 'src/app/shared/services/article.service';
import { CommentService } from 'src/app/shared/services/comment.service';
import { ArticleType } from 'src/app/types/article.type';
import { CommentType } from 'src/app/types/comment.type';
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
  public comments: CommentType[] = [];
  public commentsCount: number = 0;
  public commentInput: string = '';

  constructor(
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private commentService: CommentService,
    private _snackBar: MatSnackBar
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

  public processComment(offset: number): void {
    this.commentService
      .getComments(offset, this.article.id)
      .subscribe((commentsData: CommentsType) => {
        this.commentsCount = commentsData.allCount;

        if (this.comments.length === 0) {
          this.comments = commentsData.comments;
        } else {
          this.comments = [...this.comments, ...commentsData.comments];
        }
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
