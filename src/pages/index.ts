import { Component }            from '@angular/core';

import { ReportListPage }       from './report-list/report-list';
import { SettingsPage }         from './settings/settings';
import { LoginPage }            from './login/login';
import { SignupPage }           from './signup/signup';
import { TutorialPage }         from './tutorial/tutorial';
import { WelcomePage }          from './welcome/welcome';
import { ReportCreatePage }     from './report-create/report-create';
import { ExpenseCreatePage }    from './expense-create/expense-create';
import { ReportDetailTabsPage } from './report-detail-tabs/report-detail-tabs';
import { ExpenseDetailPage }    from './expense-detail/expense-detail';

export const MAIN_PAGE: any = ReportListPage;
export const FIRST_RUN_PAGE: any = TutorialPage;

export {
	LoginPage,
	SignupPage,
	TutorialPage,
	WelcomePage,
	SettingsPage,
	ReportListPage,
	ReportCreatePage,
	ExpenseCreatePage,
	ExpenseDetailPage,
	ReportDetailTabsPage
};

export const PAGES: any[] = [
	LoginPage,
	SignupPage,
	TutorialPage,
	WelcomePage,
	SettingsPage,
	ReportListPage,
	ReportCreatePage,
	ExpenseCreatePage,
	ExpenseDetailPage,
	ReportDetailTabsPage
];
