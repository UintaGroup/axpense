import { Component, Input } from '@angular/core';

@Component({
	selector: 'report-status-badge',
	template: `
		<ion-badge [color]="getStatusColor()">{{status | reportStatus}}</ion-badge>
	`
})
export class ReportStatusBadge {

	@Input()
	public status: number;

	public getStatusColor(): string  {
		switch(this.status) {
			case 1:
				return 'inactive';
			case 2:
				return 'danger';
			default:
				return 'secondary';
		}
	}
}
