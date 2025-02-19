import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArticleType } from 'src/app/types/article.type';
import { environment } from 'src/environments/environment';
import { ArticlesType } from 'src/app/types/articles.type';
import { DetailArticleType } from 'src/app/types/detail-article.type';
import { CategoryType } from 'src/app/types/category.type';
import { ActiveParamsType } from 'src/app/types/active-params.type';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  public getTopArticles(): Observable<ArticleType[]> {
    return this.http.get<ArticleType[]>(environment.api + 'articles/top');
  }

  public getArticles(activeParams: ActiveParamsType): Observable<ArticlesType> {
    return this.http.get<ArticlesType>(environment.api + 'articles', {
      params: activeParams,
    });
  }

  public getArticle(url: string): Observable<DetailArticleType> {
    return this.http.get<DetailArticleType>(
      environment.api + 'articles/' + url
    );
  }

  public getRelatedArticles(url: string): Observable<ArticleType[]> {
    return this.http.get<ArticleType[]>(
      environment.api + 'articles/related/' + url
    );
  }

  public getCategories(): Observable<CategoryType[]> {
    return this.http.get<CategoryType[]>(environment.api + 'categories');
  }
}
