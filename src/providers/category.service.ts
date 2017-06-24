import { Injectable }   from '@angular/core';
import { Observable }   from 'rxjs';
import { Category }     from '../models';
import { DropboxApi }   from './dropbox-api.service';

@Injectable()
export class CategoryService {

  constructor(private _api: DropboxApi) {}

  public all(): Observable<Category[]> {
    return this._api.get('categories')
		.map(r => r.json().map(x => new Category(x)))
		.catch(() => Observable.throw('No Categories found.'));
  }

}
