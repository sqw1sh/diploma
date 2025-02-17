import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArcticleRoutingModule } from './arcticle-routing.module';
import { ArticlesComponent } from './articles/articles.component';

@NgModule({
  declarations: [ArticlesComponent],
  imports: [CommonModule, ArcticleRoutingModule],
})
export class ArcticleModule {}
