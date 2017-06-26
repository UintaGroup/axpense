import { Injectable } from '@angular/core';

@Injectable()
export class DateService {

	raw(): any {
		return new Date();
	}

	now(): string {
		let now = this.raw();
		return now.toISOString();

	}

	addDays(days: number): string {
		let end = this.raw();
		end.setDate(end.getDate() + days);
		return end.toISOString();
	}

}
