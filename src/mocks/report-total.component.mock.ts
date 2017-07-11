import { Component, Input } from '@angular/core';
import { Report }          from '../models';

@Component({
	selector: 'report-total',
	template: `<h3>5</h3>`
})

export class ReportTotalComponentMock {

	@Input()
	private report: Report;
}