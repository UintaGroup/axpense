import { ReportService } from './report.service';
import { LocalDb } from './local-db.service';
import { ExpenseService } from './expense.service';
import { LocalDbMock } from '../mocks';
import { Report } from '../models/report.model';

describe('ReportService', () => {

	let db: LocalDb;
	let expenseSrvc: ExpenseService;

	let classUnderTest: ReportService;

	beforeEach(() => {
		db = LocalDbMock.instance();
		expenseSrvc = jasmine.createSpyObj('ExpenseSrevice', ['deleteAll']);

		classUnderTest = new ReportService(db, expenseSrvc);
	});

	it('should initialize', () => {

		expect(classUnderTest).toBeDefined();
	});

	describe('all', () => {

		it('should query for all reports', done => {
			classUnderTest.all()
				.then(() => {
					expect(db.queryWithArrayResult).toHaveBeenCalledWith('SELECT * FROM reports');
					done();
				});
		});

	});

	describe('all$', () => {

		it('should query for all reports', done => {
			classUnderTest.all$()
				.subscribe(() => {
					expect(db.queryWithArrayResult).toHaveBeenCalledWith('SELECT * FROM reports');
					done();
				});
		});

	});

	// describe('save', () => {
	// 	let report: Report;
	// 	let insertResponse: any;
	//
	// 	beforeEach(() => {
	// 		report = Report.create({});
	// 		insertResponse = {res: {id: 1}};
	//
	// 		db = jasmine.createSpyObj('LocalDb', ['insert'])
	// 		db.insert.and.returnValue(insertResponse);
	// 	});
	//
	// 	it('should insert report', done => {
	// 		classUnderTest.save(report)
	// 			.then(() => {
	// 				expect(db.insert).toHaveBeenCalledWith(Report.tableName, t statusreport);
	// 				done();
	// 			});
	// 	});
	//
	// });

});
