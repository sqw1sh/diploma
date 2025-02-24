import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  // private isLoad: boolean = false;
  public isLoad$: Subject<boolean> = new Subject<boolean>();

  constructor() {}
}
