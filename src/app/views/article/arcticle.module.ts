import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArcticleRoutingModule } from './arcticle-routing.module';
import { ArticlesComponent } from './articles/articles.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArticleComponent } from './article/article.component';
import { CommentComponent } from 'src/app/shared/components/comment/comment.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ArticlesComponent, ArticleComponent, CommentComponent],
  imports: [CommonModule, ArcticleRoutingModule, SharedModule, FormsModule],
})
export class ArcticleModule {}
