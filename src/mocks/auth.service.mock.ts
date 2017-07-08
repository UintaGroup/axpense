import { AuthService } from '../providers/auth.service';
import { Observable } from 'rxjs/Observable';

export class AuthServiceMock {
	public static instance(): AuthService {
		let session: any = {
			token: 'abcdefg',
			expiration: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toDateString(),
			userName: 'bobbarker'
		};

		let instance: any = jasmine.createSpyObj('AuthService', [
			'login',
			'initializeSession',
			'register',
			'logout',
			'getSession',
			'setSession'
		]);

		instance.login.and.returnValue(Observable.of(session));
		instance.register.and.returnValue(Observable.of(session));
		instance.logout.and.returnValue(Promise.resolve());
		instance.getSession.and.returnValue(Promise.resolve(session));
		instance.setSession.and.returnValue(Promise.resolve(session));

		return instance;
	}
}