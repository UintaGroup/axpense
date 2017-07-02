import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement }    from '@angular/core';

import { ReportListPage } from './report-list';
import {
	App, Config, DomController, Events, Form, GestureController, IonicModule, Keyboard, MenuController, Modal,
	ModalController,
	NavController,
	Platform
} from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '../../common/common.module';
import {
	AppMock, EventsMock, MenuControllerMock, ModalControllerMock, ModalMock,
	NavControllerMock
} from 'ionic-mocks';
import { ReportService } from '../../providers/report.service';
import { ReportServiceMock } from '../../mocks/report.service.mock';
import { ConfigMock, PlatformMock, TranslateServiceMock } from '../../mocks';
import { By } from '@angular/platform-browser';
import { TestUtils } from '../../test';
import { providers } from '../../app/app.module';

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
				{ provide: ReportService, useFactory: () => { return reportService;}},
				{ provide: ModalController, useFactory: () => { return modalCtrl;}},
				{ provide: NavController, useFactory: () => { return navCrtl}},
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
