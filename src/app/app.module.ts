import { NgModule, ErrorHandler, Provider }         from '@angular/core';
import { BrowserModule }                            from '@angular/platform-browser';
import { Http, HttpModule }                         from '@angular/http';
import { Storage, IonicStorageModule }              from '@ionic/storage';
import { CloudSettings, CloudModule }               from '@ionic/cloud-angular';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { TranslateModule, TranslateLoader }         from '@ngx-translate/core';
import { TranslateHttpLoader }                      from '@ngx-translate/http-loader';
import { CommonModule }                             from '../common';

import { App }                                      from './app.component';
import { NATIVE_PLUGINS }                           from './plugins';
import { PAGES }                                    from '../pages';
import { APP_PROVIDERS, SettingsService, RdbStore, LocalDb, QueryBuilderService } from '../providers';
import { TABLES }                                   from '../config/db.config';
import { APP_CONFIG, CONFIG }                       from '../config/app.config';

export function createTranslateLoader(http: Http): TranslateHttpLoader {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function dbServiceFactory(storage: Storage, rdbStore: RdbStore, query: QueryBuilderService): LocalDb {
	return new LocalDb(storage, rdbStore, query, TABLES);
}

export function provideSettingsFactory(storage: Storage): SettingsService {
	return new SettingsService(storage, {
		receiptImageQuality: 50,
		saveReceiptToGallery: false,
		reportDuration: 7,
	});
}

const cloudSettings: CloudSettings = {
	'core': {
		'app_id': 'e2ed6492'
	}
};

export function providers(): Provider[] {
	return [
		{provide: APP_CONFIG, useValue: CONFIG},
		APP_PROVIDERS,
		NATIVE_PLUGINS,
		{
			provide: SettingsService,
			useFactory: provideSettingsFactory,
			deps: [Storage]
		},
		{
			provide: LocalDb,
			useFactory: dbServiceFactory,
			deps: [Storage, RdbStore, QueryBuilderService]
		},
		{
			provide: ErrorHandler,
			useClass: IonicErrorHandler
		}
	];
}

@NgModule({
	declarations: [App, PAGES],
	imports: [
		BrowserModule,
		CommonModule,
		CloudModule.forRoot(cloudSettings),
		HttpModule,
		IonicModule.forRoot(App),
		IonicStorageModule.forRoot({
			name: '_axpensekv'
		}),
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: (createTranslateLoader),
				deps: [Http]
			}
		})
	],
	bootstrap: [IonicApp],
	entryComponents: [App, PAGES],
	providers: providers()
})
export class AppModule {
}
