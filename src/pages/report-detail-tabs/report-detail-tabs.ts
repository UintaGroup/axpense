import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Report } from '../../models/report.model';

@IonicPage()
@Component({
	selector: 'page-report-detail-tabs',
	templateUrl: 'report-detail-tabs.html'
})
export class ReportDetailTabsPage {

	public report: Report;

	reportHeaderTabRoot = 'ReportHeaderTabPage'
	reportExpensesTabRoot = 'ReportExpensesTabPage'


	constructor(public navCtrl: NavController, navParams: NavParams) {
		this.report = navParams.get('report');
	}


}
