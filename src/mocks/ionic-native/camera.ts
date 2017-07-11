export class CameraMock {
	public static instance(): any {
		let instance: any = jasmine.createSpyObj('Camera', ['getPicture']);
		instance.getPicture.and.returnValue(Promise.resolve());

		return instance;
	}
}