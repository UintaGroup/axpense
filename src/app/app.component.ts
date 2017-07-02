import { Component, ViewChild }                 from '@angular/core';
import { Platform, Nav, Config, Events }        from 'ionic-angular';
import { StatusBar }                            from '@ionic-native/status-bar';
import { SplashScreen }                         from '@ionic-native/splash-screen';
import { TranslateService }                     from '@ngx-translate/core';

import { AuthService, LocalDb }                 from '../providers';
import { AppEvents }                            from '../models';
import { FIRST_RUN_PAGE, MAIN_PAGE }            from '../pages';
import { SettingsPage, ReportListPage, SignupPage, LoginPage  } from '../pages';

@Component({
	template: `<ion-menu [content]="content">
				<ion-header>
					<ion-toolbar>
						<ion-title>Pages</ion-title>
					</ion-toolbar>
				</ion-header>

				<ion-content>
					<ion-list>
						<ion-item menuClose *ngFor="let p of pages" (click)="openPage(p)">
							<ion-icon name="{{p.icon}}"></ion-icon>
								{{p.title | translate}}
						</ion-item>
					</ion-list>
				</ion-content>
				
				<ion-footer>
					<ion-list>
						<ion-item menuClose (click)="logout()">
							<ion-icon name="log-out"></ion-icon>
							{{'BUTTON.LOGOUT' | translate }}
						</ion-item>
					</ion-list>
				</ion-footer>
			</ion-menu>
<ion-nav #content [root]="rootPage"></ion-nav>`
})
export class App {
	public rootPage: Component = FIRST_RUN_PAGE;

	@ViewChild(Nav)
	public nav: Nav;

	public pages: any[] = [
		{icon: 'paper', title: 'TITLE.REPORT_LIST', component: ReportListPage},
		{icon: 'contact', title: 'TITLE.SIGNUP', component: SignupPage},
		{icon: 'cog', title: 'TITLE.SETTINGS', component: SettingsPage}
	];

	constructor(platform: Platform,
		config: Config,
		splashScreen: SplashScreen,
		statusBar: StatusBar,
		localDb: LocalDb,
		events: Events,
		translateSrvc: TranslateService,
		private _authSrvc: AuthService) {

		this.initializeTranslations(config, translateSrvc);
		this.eventRegistration(events);

		platform.ready()
			.then(() => this.onReady(localDb, _authSrvc, statusBar, splashScreen));
	}

	public openPage(page: any): Promise<any> {

		return this.nav.setRoot(page.component);
	}

	public logout(): Promise<any> {

		return this._authSrvc.logout();
	}

	private onReady(localDb: LocalDb, authSrvc: AuthService, statusBar: StatusBar, splashScreen: SplashScreen): Promise<any> {

		return localDb.initialize()
			.then(() => authSrvc.initializeSession())
			.then(() => {
				statusBar.styleDefault();
				splashScreen.hide();
			});
	}

	private initializeTranslations(config: Config, service: TranslateService): any {

		service.setDefaultLang('en');
		service.use('en');

		return service.get('BUTTON.BACK')
			.subscribe(v => config.set('ios', 'backButtonText', v));
	}

	private eventRegistration(events: Events): void {

		events.subscribe(AppEvents.LOGOUT, () => this.openPage({component: LoginPage}));
		events.subscribe(AppEvents.UNAUTHENTICATED, () => this.openPage({component: FIRST_RUN_PAGE}));
		events.subscribe(AppEvents.AUTHENTICATED, () => this.openPage({component: MAIN_PAGE}));
	}
}
