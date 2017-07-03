import { Observable } from 'rxjs';

export class TranslateServiceMock {
	public static instance(): any {
		let instance = jasmine.createSpyObj('TranslateServiceMock', ['get']);
		instance.get.and.returnValue(Observable.of(''));

		return instance;
	}
}