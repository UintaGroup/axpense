import { Expense } from '../models/expense.model';
import { Report } from '../models/report.model';

export const TABLES: any[] = [
	{
		name: Report.tableName,
		sync: false,
		columns: [
			{ name: 'id', type: 'INTEGER PRIMARY KEY AUTOINCREMENT' },
			{ name: 'name', type: 'TEXT' },
			{ name: 'created', type: 'TEXT' },
			{ name: 'startDate', type: 'TEXT' },
			{ name: 'endDate', type: 'TEXT' },
			{ name: 'status', type: 'INTEGER' }
		]
	},
	{
		name: Expense.tableName,
		sync: false,
		columns: [
			{ name: 'id', type: 'INTEGER PRIMARY KEY AUTOINCREMENT' },
			{ name: 'reportId', type: 'INTEGER' },
			{ name: 'categoryId', type: 'INTEGER' },
			{ name: 'amount', type: 'REAL' },
			{ name: 'image', type: 'TEXT' },
			{ name: 'merchant', type: 'TEXT' },
			{ name: 'description', type: 'TEXT' },
			{ name: 'created', type: 'TEXT' },
			{ name: 'expenseDate', type: 'TEXT' }
		]
	}
];