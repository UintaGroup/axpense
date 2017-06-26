import { Injectable }   from '@angular/core';
import { Observable }   from 'rxjs';

import { Api }          from './api';
import { Account }      from '../models';

// const resourceKey: string = 'login';

@Injectable()
export class RegistrationService {

	constructor(private _api: Api) {}

	signUp(account: Account): Observable<Account> {
		return Observable.of(account);
	}
}