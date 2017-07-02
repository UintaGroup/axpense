import { async, ComponentFixture } from '@angular/core/testing';
import { DebugElement }             from '@angular/core';

import { TestUtils } from '../../test';
import { ReportListPage } from './report-list';
import { Modal, ModalController, NavController, } from 'ionic-angular';
import { ModalMock, ModalControllerMock, NavControllerMock } from 'ionic-mocks';
import { ReportService } from '../../providers';
import { ReportServiceMock } from '../../mocks/report.service.mock';

describe('ReportListPage', () => {

	let modal: Modal;
	let modalCtrl: ModalController;
	let reportService: ReportService;
	let navCrtl: NavController;

	let classUnderTest: ReportListPage;

	let fixture: ComponentFixture<ReportListPage>;
	let instance: ReportService;

		beforeEach(async(() => {

			modal = ModalMock.instance();
			modalCtrl = ModalControllerMock.instance(modal);
			reportService = ReportServiceMock.instance();
			navCrtl = NavControllerMock.instance();

			let providers: any[] = [
				{ provide: ReportService, useFactory: () => reportService},
				{ provide: ModalController, useFactory: () => modalCtrl},
				{ provide: NavController, useFactory: () => navCrtl}
			];

			return TestUtils.beforeEachCompiler([ReportListPage], providers)
				.then(compiled => {

					fixture = compiled.fixture;
					instance = compiled.instance;
					classUnderTest = fixture.componentInstance;

					fixture.detectChanges();
				});}
		));

		describe('init', () => {

			it('should set reports', () => {
				classUnderTest.init();

				expect(classUnderTest.reports).toEqual(reportService.all$());
			});
		});

		describe('add', () => {

			it('should create modal', () => {
				classUnderTest.add();

				expect(modalCtrl.create).toHaveBeenCalled();
			});

			it('presents modal', () => {
				classUnderTest.add();

				expect(modal.present).toHaveBeenCalled();
			});
		});

		describe('submit', () => {

			it('should call save on reportService', done => {
				let report: any = {};

				classUnderTest.submit(report)
					.then(() => {
						// expect(reportService.).toHaveBeenCalledWith(report);
						done();
					});

			});
		});

	});
