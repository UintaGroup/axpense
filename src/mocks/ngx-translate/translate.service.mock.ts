import { Observable } from 'rxjs';

export class TranslateServiceMock {
	public static instance(): any {
		let instance: any = jasmine.createSpyObj('TranslateServiceMock', ['get', 'setDefaultLang', 'use']);
		instance.get.and.returnValue(Observable.of(''));

		return instance;
	}
}