import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthType } from 'src/app/types/auth.type';
import { DefaultResponseType } from 'src/app/types/default-response.type';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private loaderService: LoaderService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.isLoad$.next(true);

    const tokens = this.authService.getTokens();

    if (tokens && tokens.accessToken) {
      const newReq = req.clone();

      newReq.headers.set('x-auth', tokens.accessToken);

      return next.handle(newReq).pipe(
        catchError((error) => {
          if (
            error.status &&
            !newReq.url.includes('/login') &&
            !newReq.url.includes('/refresh') &&
            !newReq.url.includes('/comments')
          ) {
            return this.handle401Error(newReq, next);
          }

          if (error.status === 400 && newReq.url.includes('/comments')) {
            return next.handle(req);
          }

          return throwError(() => error);
        }),
        finalize(() => {
          this.loaderService.isLoad$.next(false);
        })
      );
    }

    return next.handle(req);
  }

  private handle401Error(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.refresh().pipe(
      switchMap((result: AuthType | DefaultResponseType) => {
        let error = '';

        if ((result as DefaultResponseType).error) {
          error = (result as DefaultResponseType).message;
        }

        const resultRefresh = result as AuthType;

        if (
          !resultRefresh.accessToken ||
          !resultRefresh.refreshToken ||
          !resultRefresh.userId
        ) {
          error = 'Ошибка авторизации';
        }

        this.authService.setTokens(
          resultRefresh.accessToken,
          resultRefresh.refreshToken
        );

        const newReq = req.clone();
        newReq.headers.set('x-auth', resultRefresh.refreshToken);

        return next.handle(newReq);
      }),
      catchError((error) => {
        this.authService.removeTokens();
        this.router.navigate(['/']);
        return throwError(() => error);
      }),
      finalize(() => {
        this.loaderService.isLoad$.next(false);
      })
    );
  }
}
