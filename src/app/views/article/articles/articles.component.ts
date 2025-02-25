import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/shared/services/article.service';
import { ActiveParamsType } from 'src/app/types/active-params.type';
import { ArticlesType } from 'src/app/types/articles.type';
import { AtiveParamsUtil } from '../../../shared/utils/active-params.util';
import { CategoryType } from 'src/app/types/category.type';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit, OnDestroy {
  public isFilterMenuOpen: boolean = false;
  public pages: number[] = [];
  public activeParams: ActiveParamsType;
  public articles: ArticlesType | null = null;
  public categories: CategoryType[] = [];
  public appliedFilters: CategoryType[] = [];

  private getCategoriesSubscription$: Subscription | null = null;
  private getArticlesSubscription$: Subscription | null = null;

  constructor(
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activeParams = {
      page: '',
      categories: [],
    };
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.activeParams = AtiveParamsUtil.process(params);

      this.getCategoriesSubscription$ = this.articleService
        .getCategories()
        .subscribe((data: CategoryType[]) => {
          this.categories = data;

          this.appliedFilters = [];

          this.activeParams.categories?.forEach((category) => {
            this.appliedFilters.push(
              this.categories.find(
                (item) => item.url === category
              ) as CategoryType
            );
          });
        });

      this.getArticlesSubscription$ = this.articleService
        .getArticles(this.activeParams)
        .subscribe((data: ArticlesType) => {
          this.articles = data;

          this.pages = [];

          for (let i = 1; i <= this.articles.pages; i++) {
            this.pages.push(i);
          }
        });
    });
  }

  ngOnDestroy(): void {
    this.getCategoriesSubscription$?.unsubscribe();
    this.getArticlesSubscription$?.unsubscribe();
  }

  public changeFilterMenuCondition(): void {
    this.isFilterMenuOpen = !this.isFilterMenuOpen;
  }

  public applyCategory(url: string): void {
    if (url) {
      this.activeParams.page = '1';

      if (
        this.activeParams.categories &&
        this.activeParams.categories?.length > 0
      ) {
        const activeFilter = this.activeParams.categories.find(
          (item) => item === url
        );

        if (!activeFilter) {
          this.activeParams.categories = [...this.activeParams.categories, url];
        } else {
          this.activeParams.categories = this.activeParams.categories.filter(
            (item) => item !== url
          );
        }
      } else {
        this.activeParams.categories = [url];
      }

      this.router.navigate(['/articles'], { queryParams: this.activeParams });
    }
  }

  public removeAppliedFilter(category: CategoryType): void {
    this.activeParams.categories = this.activeParams.categories?.filter(
      (item) => item !== category.url
    );

    this.router.navigate(['/articles'], { queryParams: this.activeParams });
  }

  public categoryIsActive(url: string): boolean {
    return !!this.appliedFilters.find((item) => item.url === url);
  }

  public openPage(page: number): void {
    if (page >= 1 && page <= this.pages.length) {
      this.activeParams.page = page.toString();
      this.router.navigate(['/articles'], { queryParams: this.activeParams });
    }
  }
}
