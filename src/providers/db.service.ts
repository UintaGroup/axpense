import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SQLite } from '@ionic-native/sqlite';

@Injectable()
export class DbService {
	constructor(private _sqlLite: SQLite) {
	}

	public save(item?: any): Observable<any> {
		return Observable.of(undefined);
	}

	public delete(item?: any): Observable<any> {
		return Observable.of(undefined);
	}

	public update(item?: any): Observable<any> {
		return Observable.of(undefined);
	}
}