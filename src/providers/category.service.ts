import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Api }      from './api';
import { Category } from '../models';

@Injectable()
export class CategoryService {

  categories: Category[] = [
    Category.create({id: 1, name: 'Transportation'}),
    Category.create({id: 2, name: 'Meals'}),
    Category.create({id: 3, name: 'Entertainment'}),
    Category.create({id: 4, name: 'Misc'})
  ];

  constructor(public api: Api) {}

  all$(): Observable<Category[]> {
    return Observable.of(this.categories);
  }
}
