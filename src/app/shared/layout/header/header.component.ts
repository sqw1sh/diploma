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
  private isLoggedSubscribe$: Subscription | null = null;
  private getUserInfoSubscribe$: Subscription | null = null;
  public user: UserType | null = null;
  public isLogged: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.isLogged = this.authService.isLogged;

    this.isLoggedSubscribe$ = this.authService.isLogged$.subscribe(
      (data: boolean) => {
        this.isLogged = data;
      }
    );

    if (this.isLogged) {
      this.getUserInfoSubscribe$ = this.authService
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

  public navigate(fragment: string): void {
    this.router.navigate(['/'], { fragment: fragment });
  }

  ngOnDestroy(): void {
    this.isLoggedSubscribe$?.unsubscribe();
    this.getUserInfoSubscribe$?.unsubscribe();
  }
}
