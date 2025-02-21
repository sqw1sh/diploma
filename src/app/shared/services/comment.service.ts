import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ActionType } from 'src/app/types/action.type';
import { ActionsType } from 'src/app/types/actions.type';
import { CommentsType } from 'src/app/types/comments.type';
import { DefaultResponseType } from 'src/app/types/default-response.type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  public getComments(
    offset: number,
    article: string
  ): Observable<CommentsType> {
    return this.http.get<CommentsType>(environment.api + 'comments', {
      params: {
        offset,
        article,
      },
    });
  }

  public addComment(
    text: string,
    article: string
  ): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(
      environment.api + 'comments',
      {
        text,
        article,
      },
      {
        headers: {
          'x-auth': this.authService.getTokens().accessToken,
        },
      }
    );
  }

  public applyActionForComment(
    action: ActionType,
    id: string
  ): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(
      environment.api + 'comments/' + id + '/apply-action',
      { action },
      {
        headers: {
          'x-auth': this.authService.getTokens().accessToken,
        },
      }
    );
  }

  public getActionsForComment(id: string): Observable<ActionsType[]> {
    return this.http.get<ActionsType[]>(
      environment.api + 'comments/' + id + '/actions',
      {
        headers: {
          'x-auth': this.authService.getTokens().accessToken,
        },
      }
    );
  }

  public getCommentACtionsForUser(
    articleId: string
  ): Observable<ActionsType[]> {
    return this.http.get<ActionsType[]>(
      environment.api + 'comments/article-comment-actions',
      {
        headers: {
          'x-auth': this.authService.getTokens().accessToken,
        },
        params: {
          articleId,
        },
      }
    );
  }
}
