import { FormGroupMock } from './form-group.mock';

export class FormBuilderMock {
	public static instance(form?: FormGroupMock): any {

		let instance: any = jasmine.createSpyObj('FormBuilder', ['group']);
		instance.group.and.returnValue(form || FormGroupMock.instance());

		return instance;
	}
}