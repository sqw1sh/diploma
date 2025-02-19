import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArcticleRoutingModule } from './arcticle-routing.module';
import { ArticlesComponent } from './articles/articles.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArticleComponent } from './article/article.component';

@NgModule({
  declarations: [ArticlesComponent, ArticleComponent],
  imports: [CommonModule, ArcticleRoutingModule, SharedModule],
})
export class ArcticleModule {}
