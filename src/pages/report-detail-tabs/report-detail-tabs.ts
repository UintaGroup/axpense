import { Component }            from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { Report }               from '../../models';

@IonicPage()
@Component({
	selector: 'page-report-detail-tabs',
	templateUrl: 'report-detail-tabs.html'
})
export class ReportDetailTabsPage {

	public report: Report;
	public reportHeaderTabRoot: Component = 'ReportHeaderTabPage';
	public reportExpensesTabRoot: Component = 'ReportExpensesTabPage';

	constructor(navParams: NavParams) {
		this.report = navParams.get('report');
	}
}
