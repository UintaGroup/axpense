import { Injectable }   from '@angular/core';
import { Observable }   from 'rxjs';
import { DropboxApi }   from './dropbox-api.service';
import { Category }     from '../models';

@Injectable()
export class CategoryService {

	constructor(private _api: DropboxApi) {}

	public all(): Observable<Category[]> {
		// TODO - translate error message
		return this._api.get('categories')
			.map(r => r.json().map(x => new Category(x)))
			.catch(() => Observable.throw('No Categories found.'));
	}

}
