import { Component, ViewChild }     from '@angular/core';
import { Platform, Nav, Config, Events }    from 'ionic-angular';
import { StatusBar }                from '@ionic-native/status-bar';
import { SplashScreen }             from '@ionic-native/splash-screen';

import { Settings }                 from '../providers';
import { TranslateService }         from 'ng2-translate/ng2-translate';

import { FirstRunPage }             from '../pages';
import { LoginPage }                from '../pages';
import { TutorialPage }             from '../pages';
import { WelcomePage }              from '../pages';
import { ReportListPage }           from '../pages';
import { AuthService, LocalDb }     from '../providers';
import { AppEvents }                from '../models';


@Component({
	template: `
        <ion-menu [content]="content">
            <ion-header>
                <ion-toolbar>
                    <ion-title>Pages</ion-title>
                </ion-toolbar>
            </ion-header>

            <ion-content>
                <ion-list>
                    <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
                        {{p.title}}
                    </button>
                </ion-list>
            </ion-content>
            <ion-footer>
                <ion-list>
                    <button menuClose ion-item (click)="logout()">
                        LOGOUT
                    </button>
                </ion-list>
            </ion-footer>
        </ion-menu>
        <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class App {
	rootPage = FirstRunPage;

	@ViewChild(Nav) nav: Nav;

	pages: any[] = [
		{title: 'Tutorial', component: TutorialPage},
		{title: 'Welcome', component: WelcomePage},
		{title: 'Reports', component: ReportListPage},
		{title: 'Login', component: LoginPage}
	];

	constructor(translate: TranslateService,
		platform: Platform,
		settings: Settings,
		config: Config,
		splashScreen: SplashScreen,
		statusBar: StatusBar,
		localDb: LocalDb,
		public events: Events,
		public authSrvc: AuthService) {

		translate.setDefaultLang('en');
		translate.use('en');

		this.eventRegistration();

		translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
			config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
		});

		platform.ready()
			.then(() => localDb.setupDb())
			.then(() => authSrvc.initializeSession())
			.then(() => {
				statusBar.styleDefault();
				splashScreen.hide();
			});
	}

	public eventRegistration(): void {
		this.events.subscribe(AppEvents.LOGOUT, () => this.openPage({component: LoginPage}));
		this.events.subscribe(AppEvents.UNAUTHENTICATED, () => this.openPage({component: LoginPage}));
		this.events.subscribe(AppEvents.AUTHENTICATED, () => this.openPage({component: FirstRunPage}));
	}

	public openPage(page): any {
		this.nav.setRoot(page.component);
	}

	public logout(): Promise<any> {
		return this.authSrvc.logout();
	}
}
