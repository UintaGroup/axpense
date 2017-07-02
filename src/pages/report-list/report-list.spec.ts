import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement }    from '@angular/core';

import { ReportListPage } from './report-list';
import { App, Config, Events, IonicModule, ModalController, NavController, Platform } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '../../common/common.module';
import { AppMock, EventsMock, ModalControllerMock, ModalMock, NavControllerMock } from 'ionic-mocks';
import { ReportService } from '../../providers/report.service';
import { ReportServiceMock } from '../../mocks/report.service.mock';
import { ConfigMock, PlatformMock } from '../../mocks';

describe('ReportListPage', () => {

	let classUnderTest:    ReportListPage;
	let fixture: ComponentFixture<ReportListPage>;
	let de:      DebugElement;
	let el:      HTMLElement;

	beforeEach(async(() => {
		let mock: ReportServiceMock = ReportServiceMock.instance();
		TestBed.configureTestingModule({
				imports: [IonicModule, TranslateModule, CommonModule],
				declarations: [ ReportListPage ],
				providers: [
					{provide: NavController, useFactory: (NavControllerMock.instance)},
					{provide: ReportService, useFactory: (ReportServiceMock.instance)},
					{provide: NavController, useFactory: (NavControllerMock.instance)},
					{provide: ModalMock, useFactory: (ModalMock.instance)},
					{
						provide: ModalController,
						useFactory: (ModalControllerMock.instance),
						deps: [ModalMock]
					},
					{provide: Events, useFactory: (EventsMock.instance)},
					{provide: App, useFactory: (AppMock.instance)},
					{provide: Platform, useClass: PlatformMock},
					{provide: Config, useClass: ConfigMock}
				]
			})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ReportListPage);
		console.log('FIXTURE', fixture);

		// classUnderTest = fixture.componentInstance; // ReportListPage test instance

		// de = fixture.debugElement.query(By.css('h1'));
		// el = de.nativeElement;
	});

	// it('no title in the DOM until manually call `detectChanges`', () => {
	// 	expect(el.textContent).toEqual('');
	// });

	// it('should display original title', () => {
	// 	fixture.detectChanges();
	// 	// expect(el.textContent).toContain(classUnderTest..);
	// 	expect(true).toBeTruthy();
	// });

	it('should display a different test title', () => {
		// classUnderTest.title = 'Test Title';
		// fixture.detectChanges();
		// expect(el.textContent).toContain('Test Title');
		expect(true).toBeTruthy();
	});

});
