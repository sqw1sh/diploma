import { Component, Input, OnInit } from '@angular/core';
import { ArticleType } from 'src/app/types/article.type';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
})
export class ArticleCardComponent implements OnInit {
  public serverPublicPath: string = environment.serverPublicPath;

  @Input() article!: ArticleType;

  constructor() {}

  ngOnInit(): void {}
}
