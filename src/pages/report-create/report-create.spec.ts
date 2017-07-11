import { async, ComponentFixture } from '@angular/core/testing';
import { ReportCreatePage } from './report-create';
import { TestUtils } from '../../test';
import { ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingsService } from '../../providers/settings.service';
import { DateService } from '../../common/providers/date-service';
import { ViewControllerMock } from 'ionic-mocks';
import { FormBuilderMock } from '../../mocks/angular/form-builder.mock';
import { SettingsServiceMock } from '../../mocks/settings.service.mock';
import { DateServiceMock } from '../../mocks/date.service.mock';
import { FormGroupMock } from '../../mocks/angular/form-group.mock';
import { Report } from '../../models/report.model';

describe('ReportCreatePage', () => {

	let viewCtrl: ViewController;
	let form: FormGroup;
	let formBuilder: FormBuilder;
	let settingsSrvc: SettingsService;
	let dateSrvc: DateService;
	let formVal: any = {};

	let classUnderTest: ReportCreatePage;

	let fixture: ComponentFixture<ReportCreatePage>;
	let instance: ReportCreatePage;

	beforeEach(async(() => {

			form = FormGroupMock.instance(true, formVal);
			viewCtrl = ViewControllerMock.instance();
			formBuilder = FormBuilderMock.instance(form);
			settingsSrvc = SettingsServiceMock.instance();
			dateSrvc = DateServiceMock.instance();

			let providers: any[] = [
				{provide: FormBuilder, useFactory: () => formBuilder},
				{provide: SettingsService, useFactory: () => settingsSrvc},
				{provide: ViewController, useFactory: () => viewCtrl},
				{provide: DateService, useFactory: () => dateSrvc}
			];

			return TestUtils.beforeEachCompiler([ReportCreatePage], providers)
				.then(compiled => {

					fixture = compiled.fixture;
					instance = compiled.instance;
					classUnderTest = fixture.componentInstance;

					fixture.detectChanges();
				});
		}
	));

	afterEach(() => {
		fixture.destroy();
	});

	it('should initialize', () => {

		expect(classUnderTest).toBeDefined();
	});

	describe('cancel', () => {

		it('should call dismiss on ViewController', done => {
			classUnderTest.cancel()
				.then(() => {
					expect(viewCtrl.dismiss).toHaveBeenCalled();
					done();
				});
		});

	});

	describe('submit', () => {

		it('should dismiss with form Value', done => {
			let newReport: Report = Report.create(formVal);

			classUnderTest.submit()
				.then(() => {
					expect(viewCtrl.dismiss).toHaveBeenCalledWith(newReport);
					done();
				});

		});
	});
});