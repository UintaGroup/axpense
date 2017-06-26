import { NgModule }             from '@angular/core';
import { IonicPageModule }      from 'ionic-angular';
import { CommonModule }         from '../../common';

import { ReportHeaderTabPage }  from './report-header-tab';

@NgModule({
	declarations: [
		ReportHeaderTabPage,
	],
	imports: [
		CommonModule,
		IonicPageModule.forChild(ReportHeaderTabPage),
	],
	exports: [
		ReportHeaderTabPage
	]
})
export class ReportHeaderTabPageModule {
}
