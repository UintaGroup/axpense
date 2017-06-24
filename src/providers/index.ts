import { Api }              from './api';
import { Items }            from './items';
import { User }             from './user';
import { ReportService }    from './report.service';
import { CategoryService }  from './category.service';
import { Settings }         from './settings';
import { RdbStore }         from './rdb-store.service';
import { ExpenseService }   from './expense.service';
import { LoggerService }    from './logger.service';
import { DropboxApi }       from './dropbox-api.service';
import { LocalDb }          from './local-db.service';
import { QueryBuilderService } from './query-builder.service';
import { AuthService }      from './auth.service';

export {
	QueryBuilderService,
	Api,
	Items,
	User,
	Settings,
	RdbStore,
	LoggerService,
	LocalDb,
	ExpenseService,
	ReportService,
	CategoryService,
	DropboxApi,
	AuthService
}

export const APP_PROVIDERS = [
	QueryBuilderService,
	Api,
	Items,
	User,
	LoggerService,
	ExpenseService,
	LocalDb,
	ReportService,
	CategoryService,
	RdbStore,
	DropboxApi,
	AuthService
];