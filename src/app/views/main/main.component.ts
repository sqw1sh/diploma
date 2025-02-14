import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
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

  public articles: ArticleType[] = [
    {
      id: '63ca02683fe296dbe1e873e2',
      title: '6 сайтов для повышения  продуктивности',
      description:
        'Хотите проводить время в сети с пользой? Наша подборка из шести полезных, но малоизвестных сайтов увеличит вашу продуктивность, поможет успевать больше в течение дня и всегда быть на шаг впереди!',
      image: 'image1.jpg',
      date: '2023-01-20T02:54:32.543Z',
      category: 'Фриланс',
      url: '6_saitov_dlya_povisheniya__produktivnosti',
    },
    {
      id: '63ca02683fe296dbe1e873e3',
      title: 'Как произвести впечатление на нового клиента?',
      description:
        'Поиск новых клиентов — это сложная задача не только для новичков, но и для опытных специалистов. Мы расскажем, как справиться с волнением, завоевать доверие клиента и произвести на него потрясающее первое впечатление.',
      image: 'image2.jpg',
      date: '2023-01-20T02:54:32.543Z',
      category: 'Таргет',
      url: 'kak_proizvesti_vpechatlenie_na_novogo_klienta?',
    },
    {
      id: '63ca02683fe296dbe1e873e4',
      title: 'Как бороться с конкуренцией на фрилансе?',
      description:
        'Конкуренция — это часть нашей жизни. Мы боремся за место работы, за победу на конкурсе и даже за возможность купить последний круассан в любимом кафе. Фриланс не исключение.',
      image: 'image3.jpg',
      date: '2023-01-20T02:54:32.543Z',
      category: 'Фриланс',
      url: 'kak_borotsya_s_konkurentsiei_na_frilanse?',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
