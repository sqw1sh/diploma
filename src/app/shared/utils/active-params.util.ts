import { Params } from '@angular/router';
import { ActiveParamsType } from 'src/app/types/active-params.type';

export class AtiveParamsUtil {
  public static process(params: Params): ActiveParamsType {
    const activeParams: ActiveParamsType = { page: '1', categories: [] };

    if (params.hasOwnProperty('page')) {
      activeParams.page = params['page'];
    }

    if (params.hasOwnProperty('categories')) {
      activeParams.categories = Array.isArray(params['categories'])
        ? params['categories']
        : [params['categories']];
    }

    return activeParams;
  }
}
