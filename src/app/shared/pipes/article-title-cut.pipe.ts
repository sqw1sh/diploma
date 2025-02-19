import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'articleTitleCut',
})
export class ArticleTitleCutPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    let result: string = '';

    if (value && value.length > 50) {
      result = value.slice(0, 50) + '...';
    } else {
      result = value;
    }

    return result;
  }
}
