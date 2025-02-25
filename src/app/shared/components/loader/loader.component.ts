import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit, OnDestroy {
  public isLoad: boolean = false;

  private isLoadSubscription$: Subscription | null = null;

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.isLoadSubscription$ = this.loaderService.isLoad$.subscribe(
      (data: boolean) => {
        this.isLoad = data;
      }
    );
  }

  ngOnDestroy(): void {
    this.isLoadSubscription$?.unsubscribe();
  }
}
