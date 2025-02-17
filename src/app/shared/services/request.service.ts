import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DefaultResponseType } from 'src/app/types/default-response.type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient) {}

  public addRequest(
    name: string,
    phone: string,
    type: string,
    service?: string
  ): Observable<DefaultResponseType> {
    let body: any = {
      name: name,
      phone: phone,
      type: type,
    };

    if (type === 'order' && service) {
      body.service = service;
    }

    return this.http.post<DefaultResponseType>(
      environment.api + 'requests',
      body
    );
  }
}
