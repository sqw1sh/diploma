import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { DefaultResponseType } from 'src/app/types/default-response.type';
import { UserType } from 'src/app/types/user.type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public user: UserType | null = null;
  public isLogged: boolean = false;
  public profileSelect: boolean = false;

  private isLoggedSubscribtion$: Subscription | null = null;
  private getUserInfoSubscribtion$: Subscription | null = null;
  private logoutSubscribtion$: Subscription | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.isLogged = this.authService.isLogged;

    this.isLoggedSubscribtion$ = this.authService.isLogged$.subscribe(
      (data: boolean) => {
        this.isLogged = data;

        if (data) {
          this.getUserInfoSubscribtion$ = this.authService
            .getUserInfo()
            .subscribe((data: UserType | DefaultResponseType) => {
              let defaultResponse = data as DefaultResponseType;

              if (defaultResponse.error) {
                throw new Error(defaultResponse.message);
              }

              let userReponse = data as UserType;

              if (!userReponse.id || !userReponse.name || !userReponse.email) {
                throw new Error(
                  'Произошла ошибка запроса получения данных пользователя'
                );
              }

              this.user = userReponse;
            });
        }
      }
    );

    if (this.isLogged) {
      this.getUserInfoSubscribtion$ = this.authService
        .getUserInfo()
        .subscribe((data: UserType | DefaultResponseType) => {
          let defaultResponse = data as DefaultResponseType;

          if (defaultResponse.error) {
            throw new Error(defaultResponse.message);
          }

          let userReponse = data as UserType;

          if (!userReponse.id || !userReponse.name || !userReponse.email) {
            throw new Error(
              'Произошла ошибка запроса получения данных пользователя'
            );
          }

          this.user = userReponse;
        });
    }
  }

  ngOnDestroy(): void {
    this.isLoggedSubscribtion$?.unsubscribe();
    this.getUserInfoSubscribtion$?.unsubscribe();
    this.logoutSubscribtion$?.unsubscribe();
  }

  public navigate(fragment: string): void {
    this.router.navigate(['/'], { fragment: fragment });
  }

  public toggleProfileSelect(): void {
    this.profileSelect = !this.profileSelect;
  }

  public logout(): void {
    if (this.isLogged) {
      this.logoutSubscribtion$ = this.authService
        .logout()
        .subscribe((data: DefaultResponseType) => {
          if (data.error) {
            throw new Error(data.message);
          }

          this.profileSelect = false;
          this.authService.removeTokens();
          this.router.navigate(['/']);
        });
    }
  }
}
