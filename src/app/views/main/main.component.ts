import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DialogOrderComponent } from 'src/app/shared/components/dialog-order/dialog-order.component';
import { ArticleService } from 'src/app/shared/services/article.service';
import { ArticleType } from 'src/app/types/article.type';
import { ServiceType } from 'src/app/types/service.type';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: false,
  };

  public reviewsSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    responsive: {
      0: {
        items: 3,
      },
    },
    nav: false,
  };

  public services: ServiceType[] = [
    {
      image: 'service-1.jpg',
      title: 'Создание сайтов',
      description:
        'В краткие сроки мы создадим качественный и самое главное продающий сайт для продвижения Вашего бизнеса!',
      price: 7500,
    },
    {
      image: 'service-2.jpg',
      title: 'Продвижение',
      description:
        'Вам нужен качественный SMM-специалист или грамотный таргетолог? Мы готовы оказать Вам услугу “Продвижения” на наивысшем уровне!',
      price: 3500,
    },
    {
      image: 'service-3.jpg',
      title: 'Реклама',
      description:
        'Без рекламы не может обойтись ни один бизнес или специалист. Обращаясь к нам, мы гарантируем быстрый прирост клиентов за счёт правильно настроенной рекламы.',
      price: 1000,
    },
    {
      image: 'service-4.jpg',
      title: 'Копирайтинг',
      description:
        'Наши копирайтеры готовы написать Вам любые продающие текста, которые не только обеспечат рост охватов, но и помогут выйти на новый уровень в продажах.',
      price: 750,
    },
  ];

  public articles: ArticleType[] = [];

  constructor(
    private articleService: ArticleService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.articleService.getTopArticles().subscribe((data: ArticleType[]) => {
      this.articles = data;
    });
  }

  public openDialog(service: string) {
    this.dialog.open(DialogOrderComponent, {
      width: '727px',
      data: {
        service: service,
      },
    });
  }
}
