import { Observable } from 'rxjs/Observable';

export class ReportServiceMock {
	public static instance(): any {
		let instance: any  = jasmine.createSpyObj('RecipeCategoryService', ['all$', 'all', 'save', 'delete']);
		instance.all.and.returnValue(Promise.resolve([]));
		instance.save.and.returnValue(Promise.resolve([]));
		instance.delete.and.returnValue(Promise.resolve([]));
		instance.all$.and.returnValue(Observable.of([]));

		return instance;
	}
}
