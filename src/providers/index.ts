import { Api }              from './api';
import { ReportService }    from './report.service';
import { CategoryService }  from './category.service';
import { SettingsService }  from './settings.service';
import { RdbStore }         from './rdb-store.service';
import { ExpenseService }   from './expense.service';
import { LoggerService }    from './logger.service';
import { DropboxApi }       from './dropbox-api.service';
import { LocalDb }          from './local-db.service';
import { QueryBuilderService } from './query-builder.service';
import { AuthService }      from './auth.service';
import { RegistrationService } from './registration.service';

export {
	QueryBuilderService,
	Api,
	SettingsService,
	RdbStore,
	LoggerService,
	LocalDb,
	ExpenseService,
	ReportService,
	CategoryService,
	DropboxApi,
	AuthService,
	RegistrationService
}

export const APP_PROVIDERS = [
	QueryBuilderService,
	Api,
	LoggerService,
	ExpenseService,
	LocalDb,
	ReportService,
	CategoryService,
	RdbStore,
	DropboxApi,
	AuthService,
	RegistrationService
];