import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommonModule } from '../../common/common.module';

import { ReportDetailTabsPage } from './report-detail-tabs';

@NgModule({
	declarations: [
		ReportDetailTabsPage
	],
	imports: [
		CommonModule,
		IonicPageModule.forChild(ReportDetailTabsPage)
	],
	exports: [
		ReportDetailTabsPage
	]
})
export class ReportDetailTabsPageModule {
}
