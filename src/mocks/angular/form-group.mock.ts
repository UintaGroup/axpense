import { Observable } from 'rxjs';

export class FormGroupMock {
	public static instance(valid: boolean = true, value: any = {}): any {

		let instance = jasmine.createSpyObj('FormGroup', [
			'registerControl',
			'addControl',
			'removeControl',
			'setControl',
			'contains',
			'setValue',
			'patchValue',
			'reset',
			'getRawValue',
		]);
		instance.registerControl.and.returnValue({});
		instance.getRawValue.and.returnValue('');

		instance['valid'] = valid;
		instance['invalid'] = !valid;
		instance['nextId'] = 0;
		instance['value'] = value;
		instance['valueChanges'] = Observable.of(value);

		return instance;
	}
}