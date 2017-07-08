import { AbstractControl }  from '@angular/forms';
import { Observable }       from 'rxjs/Observable';

const EMAIL_REGEXP: any = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

export class GlobalValidator {

	public static mailFormat(control: AbstractControl): Observable<ValidationResult> {
		return new Observable(observer => {
			let result: any = null;
			/* tslint:disable */
			if (control.value != '' && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
				result = {'incorrectMailFormat': true};
			}
			/* tslint:enable */
			observer.next(result);
		});
	}

}

interface ValidationResult {
	[key: string]: boolean;
}