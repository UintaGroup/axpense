import { AbstractControl }  from '@angular/forms';
import { Observable }       from 'rxjs/Observable';

const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

export class GlobalValidator {

	static mailFormat(control: AbstractControl): Observable<ValidationResult> {
		return new Observable(observer => {
			let result = null;
			if (control.value != '' && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
				result = {'incorrectMailFormat': true};
			}
			observer.next(result);
		});
	}

}

interface ValidationResult {
	[key: string]: boolean;
}