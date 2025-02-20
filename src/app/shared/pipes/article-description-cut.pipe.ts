import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'articleDescriptionCut',
})
export class ArticleDescriptionCutPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    let result: string = '';

    if (value && value.length > 200) {
      result = value.slice(0, 200) + '...';
    } else {
      result = value;
    }

    return result;
  }
}
