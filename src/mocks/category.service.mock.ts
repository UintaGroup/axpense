import { Observable } from 'rxjs/Observable';

export class CategoryServiceMock {
	public static instance(): any {
		let instance: any = jasmine.createSpyObj('CategoryService', ['all']);
		instance.all.and.returnValue(Observable.of([]));

		return instance;
	}
}
