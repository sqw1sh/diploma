import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  public isFilterMenuOpen: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  public changeFilterMenuCondition(): void {
    this.isFilterMenuOpen = !this.isFilterMenuOpen;
  }
}
