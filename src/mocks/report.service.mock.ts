import { Observable } from 'rxjs/Observable';

export class ReportServiceMock {
	public static instance(): any {
		let instance: any = jasmine.createSpyObj('RecipeCategoryService', [
			'all$',
			'all',
			'save',
			'submit',
			'delete'
		]);
		instance.all$.and.returnValue(Observable.of([]));
		instance.all.and.returnValue(Promise.resolve([]));
		instance.save.and.returnValue(Promise.resolve([]));
		instance.submit.and.returnValue(Promise.resolve([]));
		instance.delete.and.returnValue(Promise.resolve([]));

		return instance;
	}
}
