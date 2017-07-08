export class DateServiceMock {
	public static instance(date?: Date): any {
		let instance: any = jasmine.createSpyObj('DateService', ['raw', 'now', 'addDays']);
		instance.raw.and.returnValue(date || new Date());
		instance.now.and.returnValue('');
		instance.addDays.and.returnValue('');

		return instance;
	}
}