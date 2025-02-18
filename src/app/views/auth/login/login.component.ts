import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AuthType } from 'src/app/types/auth.type';
import { DefaultResponseType } from 'src/app/types/default-response.type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public formLogin: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    rememberMe: [false],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  get email() {
    return this.formLogin.get('email');
  }

  get password() {
    return this.formLogin.get('password');
  }

  get rememberMe() {
    return this.formLogin.get('rememberMe');
  }

  public login(): void {
    if (this.formLogin.valid) {
      if ((this.email?.value, this.password?.value)) {
        this.authService
          .login(
            this.email?.value,
            this.password?.value,
            this.rememberMe?.value
          )
          .subscribe({
            next: (data: AuthType | DefaultResponseType) => {
              let defaultResponse = data as DefaultResponseType;

              if (defaultResponse.error) {
                this._snackBar.open(defaultResponse.message);
                throw new Error(defaultResponse.message);
              }

              let authResponse: AuthType = data as AuthType;

              if (
                !authResponse.accessToken ||
                !authResponse.refreshToken ||
                !authResponse.userId
              ) {
                this._snackBar.open(
                  'Произошла ошибка запроса авторизации пользователя'
                );
                throw new Error(
                  'Произошла ошибка запроса авторизации пользователя'
                );
              }

              this.authService.setTokens(
                authResponse.accessToken,
                authResponse.refreshToken
              );
              this._snackBar.open('Вы успешно авторизовались');
              this.router.navigate(['/']);
            },
            error: (errorResponse: HttpErrorResponse) => {
              if (errorResponse) {
                this._snackBar.open(errorResponse.error.message);
                throw new Error(errorResponse.error.message);
              }
            },
          });
      }
    }
  }
}
