import { Injectable }                             from '@angular/core';
import { Http, RequestOptions, URLSearchParams }  from '@angular/http';
import { Observable }                             from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { SettingsService }                        from './settings.service';

@Injectable()
export class Api {
	private url: string;

	constructor(private _http: Http, settings: SettingsService) {
		// TODO Change once we have real API
		settings.getValue('apiUrl')
		.then(() => this.url = 'https://exmaple.com/api/v1');
	}

	public get(endpoint: string, params?: any, options?: RequestOptions): Observable<any> {
		if (!options) {
			options = new RequestOptions();
		}

		if (params) {
			let p: any = new URLSearchParams();
			for (let k in params) {
				p.set(k, params[k]);
			}
			options.search = !options.search && p || options.search;
		}

		return this._http.get(this.url + '/' + endpoint, options);
	}

	public post(endpoint: string, body: any, options?: RequestOptions): Observable<any> {
		return this._http.post(this.url + '/' + endpoint, body, options);
	}

	public put(endpoint: string, body: any, options?: RequestOptions): Observable<any> {
		return this._http.put(this.url + '/' + endpoint, body, options);
	}

	public delete(endpoint: string, body: any, options?: RequestOptions): Observable<any> {
		return this._http.post(this.url + '/' + endpoint, body, options);
	}

	public patch(endpoint: string, body: any, options?: RequestOptions): Observable<any> {
		return this._http.put(this.url + '/' + endpoint, body, options);
	}
}
