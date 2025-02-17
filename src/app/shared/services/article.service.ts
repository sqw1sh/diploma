import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArticleType } from 'src/app/types/article.type';
import { environment } from 'src/environments/environment';
import { ArticlesType } from 'src/app/types/articles.type';
import { DetailArticleType } from 'src/app/types/detail-article.type';
import { CategoryType } from 'src/app/types/category.type';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  public getTopArticles(): Observable<ArticleType[]> {
    return this.http.get<ArticleType[]>(environment.api + 'articles/top');
  }

  public getArticles(
    page?: number,
    categories?: string[]
  ): Observable<ArticlesType> {
    let params: any = {};

    if (page) {
      params.page = page;
    }

    if (categories) {
      params.categories = categories;
    }

    return this.http.get<ArticlesType>(environment.api + 'articles', {
      params,
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

  public getCategories(): Observable<CategoryType> {
    return this.http.get<CategoryType>(environment.api + 'categories');
  }
}
