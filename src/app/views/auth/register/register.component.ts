import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AuthType } from 'src/app/types/auth.type';
import { DefaultResponseType } from 'src/app/types/default-response.type';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  public formRegister: FormGroup = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[А-Я][а-я]+\s{0,1}([А-Я][а-я]+\s{0,1}?){0,}$/),
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%&?])(?!.*\s).*$/
        ),
      ],
    ],
    agree: ['', Validators.required],
  });

  private registerSubscription$: Subscription | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.registerSubscription$?.unsubscribe();
  }

  get name() {
    return this.formRegister.get('name');
  }

  get email() {
    return this.formRegister.get('email');
  }

  get password() {
    return this.formRegister.get('password');
  }

  public register(): void {
    if (this.formRegister.valid) {
      if (this.name?.value && this.email?.value && this.password?.value) {
        this.registerSubscription$ = this.authService
          .register(this.name?.value, this.email?.value, this.password?.value)
          .subscribe((data: AuthType | DefaultResponseType) => {
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
                'Произошла ошибка запроса регистрации пользователя'
              );
              throw new Error(
                'Произошла ошибка запроса регистрации пользователя'
              );
            }

            this.authService.setTokens(
              authResponse.accessToken,
              authResponse.refreshToken
            );
            this._snackBar.open('Вы успешно зарегистрировались');
            this.router.navigate(['/']);
          });
      }
    }
  }
}
