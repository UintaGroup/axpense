import { Component, ViewChild }     from '@angular/core';
import { Platform, Nav, Config }    from 'ionic-angular';
import { StatusBar }                from '@ionic-native/status-bar';
import { SplashScreen }             from '@ionic-native/splash-screen';

import { Settings }                 from '../providers';
import { TranslateService }         from 'ng2-translate/ng2-translate';
import { LocalDb }                  from "../providers/local-db.service";

import { FirstRunPage }             from '../pages';
import { CardsPage }                from '../pages';
import { ContentPage }              from '../pages';
import { LoginPage }                from '../pages';
import { MapPage }                  from '../pages';
import { SignupPage }               from '../pages';
import { TabsPage }                 from '../pages';
import { TutorialPage }             from '../pages';
import { WelcomePage }              from '../pages';
import { ListMasterPage }           from '../pages';
import { MenuPage }                 from '../pages';
import { SettingsPage }             from '../pages';
import { SearchPage }               from '../pages';
import { ReportListPage }           from '../pages';


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

        </ion-menu>
        <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class App {
	rootPage = FirstRunPage;

	@ViewChild(Nav) nav: Nav;

	pages: any[] = [
		{title: 'Tutorial', component: TutorialPage},
		{title: 'Welcome', component: WelcomePage},
		{title: 'Tabs', component: TabsPage},
		{title: 'Cards', component: CardsPage},
		{title: 'Content', component: ContentPage},
		{title: 'Login', component: LoginPage},
		{title: 'Signup', component: SignupPage},
		{title: 'Map', component: MapPage},
		{title: 'Master Detail', component: ListMasterPage},
		{title: 'Menu', component: MenuPage},
		{title: 'Settings', component: SettingsPage},
		{title: 'Search', component: SearchPage},
		{title: 'Reports', component: ReportListPage}
	];

	constructor(translate: TranslateService,
		platform: Platform,
		settings: Settings,
		config: Config,
		splashScreen: SplashScreen,
		statusBar: StatusBar) {

		translate.setDefaultLang('en');
		translate.use('en');

		translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
			config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
		});

		platform.ready()
			.then(() => {
				statusBar.styleDefault();
				splashScreen.hide();
			});
	}

	public openPage(page): any {
		this.nav.setRoot(page.component);
	}
}
