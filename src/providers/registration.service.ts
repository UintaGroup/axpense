import { Injectable }   from '@angular/core';
import { Observable }   from 'rxjs';

// import { Api }          from './api';
import { Account }      from '../models';

// const resourceKey: string = 'login';

@Injectable()
export class RegistrationService {

	// TODO inject API when real registration api setup
	// constructor(private _api: Api) {}

	public signUp(account: Account): Observable<Account> {
		return Observable.of(account);
	}
}