import { NgModule, ErrorHandler, Provider }         from '@angular/core';
import { BrowserModule }                            from '@angular/platform-browser';
import { Http }                                     from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage, IonicStorageModule }              from '@ionic/storage';
import { NATIVE_PLUGINS }                           from './plugins';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';

import { App }                                      from './app.component';
import { APP_PROVIDERS }                            from '../providers';
import { Settings }                                 from '../providers/settings';
import { RdbStore }                                 from '../providers/rdb-store.service';
import { LocalDb }                                  from '../providers/local-db.service';
import { QueryBuilderService }                      from '../providers/query-builder.service';

import { PAGES }                                    from '../pages';
import { TABLES }                                   from '../config/db.config';
import { APP_CONFIG, CONFIG }                       from '../config/app.config';

export function createTranslateLoader(http: Http) {
	return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

export function dbServiceFactory(storage: Storage, rdbStore: RdbStore, query: QueryBuilderService): LocalDb {
	return new LocalDb(storage, rdbStore, query, TABLES);
}

export function provideSettingsFactory(storage: Storage) {
	return new Settings(storage, {
		option1: true,
		option2: 'Ionitron J. Framework',
		option3: '3',
		option4: 'Hello'
	});
}

export function providers(): Provider[] {
	return [
		{provide: APP_CONFIG, useValue: CONFIG},
		APP_PROVIDERS,
		NATIVE_PLUGINS,
		{
			provide: Settings,
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
		IonicModule.forRoot(App),
		IonicStorageModule.forRoot({
			name: '_axpensekv'
		}),
		TranslateModule.forRoot({
			provide: TranslateLoader,
			useFactory: (createTranslateLoader),
			deps: [Http]
		})
	],
	bootstrap: [IonicApp],
	entryComponents: [App, PAGES],
	providers: providers()
})
export class AppModule {
}
