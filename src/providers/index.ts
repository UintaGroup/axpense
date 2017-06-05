import { Api }              from './api';
import { Items }            from './items';
import { User }             from './user';
import { DbService }        from './db.service';
import { ReportService }    from './report.service';
import { CategoryService }  from './category.service';
import { Settings }         from './settings';
import { SqlStore }         from './sql-store.service';
import { ExpenseService }   from './expense.service';
import { LoggerService }    from './logger.service';

export {
	Api,
	Items,
	User,
	DbService,
	Settings,
	SqlStore,
	LoggerService,
	ExpenseService,
	ReportService,
	CategoryService
}

export const APP_PROVIDERS = [
	Api,
	Items,
	User,
	DbService,
	LoggerService,
	ExpenseService,
	ReportService,
	CategoryService,
	SqlStore
];