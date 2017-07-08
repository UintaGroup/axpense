import { Injectable } from '@angular/core';

@Injectable()
export class DateService {

	public raw(): any {
		return new Date();
	}

	public now(): string {
		let now: Date = this.raw();
		return now.toISOString();
	}

	public addDays(days: number): string {
		let end: Date = this.raw();
		end.setDate(end.getDate() + days);
		return end.toISOString();
	}

}
