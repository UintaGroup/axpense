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

export const MainPage = ReportListPage;
export const FirstRunPage = TutorialPage;

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
}

export const PAGES = [
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
