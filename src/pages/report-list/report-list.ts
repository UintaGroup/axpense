import { Component }                        from '@angular/core';
import { NavController, ModalController, Modal }   from 'ionic-angular';
import { Observable }                       from 'rxjs/Observable';

import { Report }                           from '../../models';
import { ReportService }                    from '../../providers';
import { ReportCreatePage }                 from '../report-create/report-create';
import { ReportDetailTabsPage }             from '../report-detail-tabs/report-detail-tabs';

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

	public init(): void {
		this.reports = this._reportSrvc.all$();
	}

	public add(): Promise<void> {
		let addModal: Modal = this.modalCtrl.create(ReportCreatePage);
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

	public submit(report: Report): Promise<Report> {
		return Promise.resolve(report);
	}

	public delete(report: Report): Promise<void> {
		return this._reportSrvc.delete(report)
							.then(() => this.init());
	}

	public open(report: Report): Promise<void> {
		return this.navCtrl.push(ReportDetailTabsPage, {
			report: report
		});
	}
}
