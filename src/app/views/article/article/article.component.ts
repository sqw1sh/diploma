import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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
export class ArticleComponent implements OnInit, OnDestroy {
  public article: DetailArticleType;
  public articles: ArticleType[] = [];
  public serverPublicPath = environment.serverPublicPath;
  public isLogged: boolean = false;
  public comments: CommentType[] = [];
  public commentsCount: number = 0;
  public commentInput: string = '';

  private getArticleSubscription$: Subscription | null = null;
  private getCommentsSubscription$: Subscription | null = null;
  private addCommentSubscription$: Subscription | null = null;

  constructor(
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private commentService: CommentService
  ) {
    this.article = {
      text: '',
      comments: [],
      commentsCount: 0,
      id: '',
      title: '',
      description: '',
      image: '',
      date: '',
      category: '',
      url: '',
    };
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      if (param['url']) {
        this.getArticleSubscription$ = this.articleService
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

  ngOnDestroy(): void {
    this.getArticleSubscription$?.unsubscribe();
    this.getCommentsSubscription$?.unsubscribe();
    this.addCommentSubscription$?.unsubscribe();
  }

  public processComment(offset: number): void {
    this.getCommentsSubscription$ = this.commentService
      .getComments(offset, this.article.id)
      .subscribe((commentsData: CommentsType) => {
        this.commentsCount = commentsData.allCount;

        if (this.comments.length === 0) {
          this.comments = commentsData.comments.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
        } else {
          this.comments = [...this.comments, ...commentsData.comments].sort(
            (a, b) => {
              const aDate = new Date(a.date);
              const bDate = new Date(b.date);
              return bDate.getTime() - aDate.getTime();
            }
          );
        }
      });
  }

  public addComment(): void {
    if (this.commentInput) {
      this.addCommentSubscription$ = this.commentService
        .addComment(this.commentInput, this.article.id)
        .subscribe((data: DefaultResponseType) => {
          if (data.error) {
            throw new Error(data.message);
          }

          this.commentInput = '';
          this.processComment(0);
        });
    }
  }
}
