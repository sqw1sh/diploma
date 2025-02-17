import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthType } from 'src/app/types/auth.type';
import { DefaultResponseType } from 'src/app/types/default-response.type';
import { UserType } from 'src/app/types/user.type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessTokenKey: string = 'accessToken';
  private refreshTokenKey: string = 'refreshToken';

  constructor(private http: HttpClient) {}

  public login(
    email: string,
    password: string,
    rememberMe: boolean
  ): Observable<AuthType | DefaultResponseType> {
    return this.http.post<AuthType | DefaultResponseType>(
      environment.api + 'login',
      {
        email,
        password,
        rememberMe,
      }
    );
  }

  public register(
    name: string,
    email: string,
    password: string
  ): Observable<AuthType | DefaultResponseType> {
    return this.http.post<AuthType | DefaultResponseType>(
      environment.api + 'signup',
      {
        name,
        email,
        password,
      }
    );
  }

  public refresh(
    refreshToken: string
  ): Observable<AuthType | DefaultResponseType> {
    return this.http.post<AuthType | DefaultResponseType>(
      environment.api + 'refresh',
      { refreshToken }
    );
  }

  public logout(refreshToken: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'logout', {
      refreshToken,
    });
  }

  public getUserInfo(): Observable<UserType | DefaultResponseType> {
    return this.http.get<UserType | DefaultResponseType>(
      environment.api + 'users',
      {
        headers: {
          'x-auth': this.getTokens().accessToken,
        },
      }
    );
  }

  public setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  public getTokens(): { accessToken: string; refreshToken: string } {
    const accessToken = localStorage.getItem(this.accessTokenKey);
    const refreshToken = localStorage.getItem(this.refreshTokenKey);

    return {
      accessToken: accessToken ? accessToken : '',
      refreshToken: refreshToken ? refreshToken : '',
    };
  }

  public removeTokens(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }
}
