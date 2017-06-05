import { Component }                        from '@angular/core';
import { NavController, ModalController }   from 'ionic-angular';

import { Report }                           from '../../models';
import { ReportService }                    from '../../providers';
import { ReportDetailPage }                 from '../report-detail/report-detail';
import { ReportCreatePage }                 from '../report-create/report-create';

@Component({
	selector: 'report-list',
	templateUrl: './report-list.html'
})
export class ReportListPage {
	public reports: Report[];

	constructor(public navCtrl: NavController, private _reportSrvc: ReportService, private modalCtrl: ModalController) {
		this.init();
	}

	init(): Promise<any> {
		return this._reportSrvc.all()
		           .then(reports => this.reports = reports);
	}

	add(): Promise<void> {
		let addModal = this.modalCtrl.create(ReportCreatePage);
		addModal.onDidDismiss(report => {
			if (report) {
				this.reports.push(report);
				this._reportSrvc.save(report);
			}
		});
		return addModal.present();
	}

	delete(report: Report): Promise<void> {
		return this._reportSrvc.delete(report)
		           .then(() => this.init());
	}

	open(report: Report): Promise<void> {
		return this.navCtrl.push(ReportDetailPage, {
			report: report
		});
	}
}
