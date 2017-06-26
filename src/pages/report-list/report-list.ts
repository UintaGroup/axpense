import { Component }                        from '@angular/core';
import { NavController, ModalController }   from 'ionic-angular';

import { Report }                           from '../../models';
import { ReportService }                    from '../../providers';
import { ReportCreatePage }                 from '../report-create/report-create';
import { ReportDetailTabsPage } from '../report-detail-tabs/report-detail-tabs';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'report-list-page',
	templateUrl: './report-list.html'
})
export class ReportListPage {
	public reports: Observable<Report[]>;

	constructor(public navCtrl: NavController,
				private _reportSrvc: ReportService,
				private modalCtrl: ModalController) {
		this.init();
	}

	init(): void {
		this.reports = this._reportSrvc.all$();
	}

	add(): Promise<void> {
		let addModal = this.modalCtrl.create(ReportCreatePage);
		addModal.onDidDismiss(report => {
			if (report) {
				return this._reportSrvc.save(report)
										.then(() => this.init());
			} else {
				return Promise.resolve();
			}
		});
		return addModal.present();
	}

	delete(report: Report): Promise<void> {
		return this._reportSrvc.delete(report)
							.then(() => this.init());
	}

	open(report: Report): Promise<void> {
		return this.navCtrl.push(ReportDetailTabsPage, {
			report: report
		});
	}
}
