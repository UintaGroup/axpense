export class SettingsServiceMock {
	public static instance(): any {
		let instance = jasmine.createSpyObj('SettingsService', [
			'load',
			'merge',
			'setAll',
			'setValue',
			'getValue',
			'save',
			'allSettings'
		]);

		instance.load.and.returnValue(Promise.resolve());
		instance.merge.and.returnValue(Promise.resolve());
		instance.setValue.and.returnValue(Promise.resolve());
		instance.getValue.and.returnValue(Promise.resolve());
		instance.setAll.and.returnValue(Promise.resolve());
		instance.save.and.returnValue(Promise.resolve());
		instance.allSettings.and.returnValue([]);

		return instance;
	}
}