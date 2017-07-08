import { App } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../providers/auth.service';
import { Alert, AlertController, Config, Events, Nav, Platform } from 'ionic-angular';
import { AlertMock, AlertControllerMock, ConfigMock, EventsMock, PlatformMock, StatusBarMock, NavMock } from 'ionic-mocks';
import { SplashScreenMock } from '../mocks/ionic-native';
import { LocalDb } from '../providers/local-db.service';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalDbMock } from '../mocks/local-db.service.mock';
import { TranslateServiceMock } from '../mocks/ngx-translate/translate.service.mock';
import { AuthServiceMock } from '../mocks/auth.service.mock';

describe('App', () => {

	let nav: Nav;

	let platform: Platform;
	let config: Config;
	let splash: SplashScreen;
	let statusBar: StatusBar;
	let localDb: LocalDb;
	let events: Events;
	let translateSrvc: TranslateService;
	let authSrvc: AuthService;

	let alert: Alert;
	let alertCtrl: AlertController;

	let classUnderTest: App;

	beforeEach(() => {
			nav = NavMock.instance();
			platform = PlatformMock.instance();
			config = ConfigMock.instance();
			splash = SplashScreenMock.instance();
			statusBar = StatusBarMock.instance();
			localDb = LocalDbMock.instance();
			events = EventsMock.instance();
			translateSrvc = TranslateServiceMock.instance();
			authSrvc = AuthServiceMock.instance();

			alert = AlertMock.instance();
			alertCtrl = AlertControllerMock.instance(alert);

			classUnderTest = new App(
				platform,
				config,
				splash,
				statusBar,
				localDb,
				events,
				translateSrvc,
				authSrvc,
				alertCtrl
			);

		}
	);

	it('should initialize', () => {

		expect(classUnderTest).toBeDefined();
	});

	describe('openPage', () => {

		beforeEach(() => {
			classUnderTest.nav = nav;
		});

		it('should set page as root', done => {
			let page: any = {component: {}};
			classUnderTest.openPage(page)
				.then(() => {
					expect(nav.setRoot).toHaveBeenCalledWith(page.component);
					done();
				});
		});
	});

	describe('logout', () => {

		it('should call create on alertCtrl', done => {
			classUnderTest.logout()
				.then(() => {
					expect(alertCtrl.create).toHaveBeenCalled();
					done();
				});
		});

		it('should present alert', done => {
			classUnderTest.logout()
				.then(() => {
					expect(alert.present).toHaveBeenCalled();
					done();
				});
		});
	});

});