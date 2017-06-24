import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { APP_CONFIG, AppConfig } from '../config/app.config';


@Injectable()
export class DropboxApi {

	private _url: string;

	constructor(private http: Http, @Inject(APP_CONFIG) config: AppConfig) {
		this._url = config.staticApiUrl;
	}

	get(endpoint: string): Observable<Response> {
		return this.http.get(this.buildUrl(endpoint));
	}

	public buildUrl(endpoint: string): string {
		return this._url + endpoint + '.json';
	}
}
