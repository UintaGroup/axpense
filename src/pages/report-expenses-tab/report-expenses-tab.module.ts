import { NgModule }                 from '@angular/core';
import { IonicPageModule }          from 'ionic-angular';
import { CommonModule }             from '../../common';

import { ReportExpensesTabPage }    from './report-expenses-tab';

@NgModule({
	declarations: [
		ReportExpensesTabPage,
	],
	imports: [
		CommonModule,
		IonicPageModule.forChild(ReportExpensesTabPage),
	],
	exports: [
		ReportExpensesTabPage
	]
})
export class ReportExpensesTabPageModule {
}
