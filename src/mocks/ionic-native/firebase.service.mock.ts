export class FirebaseServiceMock {
	public static instance(): any {
		let instance = jasmine.createSpyObj('FirebaseService', ['setUserId', 'setScreenName', 'logEvent', 'logError', 'getInfo']);
		instance.getInfo.and.returnValue(Promise.resolve());

		return instance;
	}
}