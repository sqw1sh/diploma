import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { RouterModule } from '@angular/router';
import { ArticleDescriptionCutPipe } from './pipes/article-description-cut.pipe';
import { ArticleTitleCutPipe } from './pipes/article-title-cut.pipe';

@NgModule({
  declarations: [ArticleCardComponent, ArticleDescriptionCutPipe, ArticleTitleCutPipe],
  imports: [CommonModule, RouterModule],
  exports: [ArticleCardComponent],
})
export class SharedModule {}
