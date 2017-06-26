import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { Report } from '../../models';

@IonicPage()
@Component({
	selector: 'page-report-header-tab',
	templateUrl: 'report-header-tab.html',
})
export class ReportHeaderTabPage {

	public report: Report;

	constructor(private _navParams: NavParams) {
		this.report = this._navParams.data;
	}
}
