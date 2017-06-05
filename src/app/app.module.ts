import { NgModule, ErrorHandler, Provider }         from '@angular/core';
import { BrowserModule }                            from '@angular/platform-browser';
import { Http }                                     from '@angular/http';
import { Storage, IonicStorageModule }              from '@ionic/storage';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { App }                                      from './app.component';

import { APP_PROVIDERS }                            from '../providers';
import { Settings }                                 from '../providers/settings';
import { SqlStore }                                 from '../providers/sql-store.service';
import { LocalDb }                                  from '../providers/local-db.service';
import { QueryBuilderService }                      from '../providers/query-builder.service';


import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { NATIVE_PLUGINS }                           from './plugins';
import { PAGES }                                    from '../pages';
import { TABLES }                                   from '../config/db.config';
import { SQLite } from '@ionic-native/sqlite';

export function createTranslateLoader(http: Http) {
	return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

export function dbServiceFactory( sqlStore: SqlStore, storage: Storage, query: QueryBuilderService): LocalDb {
	return new LocalDb(sqlStore, storage, query, TABLES);
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
		{
			provide: Settings,
			useFactory: provideSettingsFactory,
			deps: [Storage]
		},
		{
			provide: LocalDb,
			useFactory: dbServiceFactory,
			deps: [SqlStore]
		},
		{
			provide: ErrorHandler,
			useClass: IonicErrorHandler
		},
		SQLite,
		Storage,
		APP_PROVIDERS,
		NATIVE_PLUGINS
	];
}

@NgModule({
	declarations: [App, PAGES],
	imports: [
		BrowserModule,
		IonicModule.forRoot(App),
		IonicStorageModule.forRoot(),
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
