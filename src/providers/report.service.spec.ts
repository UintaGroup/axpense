import { Report }           from '../models';
import { ReportService }    from './report.service';
import { LocalDb }          from './local-db.service';
import { LocalDbMock }      from '../mocks/local-db.service.mock';
import { ExpenseService }   from './expense.service';

describe('ReportService', () => {

	let db: LocalDb;
	let expenseSrvc: ExpenseService;

	let classUnderTest: ReportService;

	beforeEach(() => {
		db = LocalDbMock.instance();
		expenseSrvc = jasmine.createSpyObj('ExpenseService', ['deleteAll']);

		classUnderTest = new ReportService(db, expenseSrvc);
	});

	it('should initialize', () => {

		expect(classUnderTest).toBeDefined();
	});

	describe('all$', () => {

		it('should query for all reports', done => {
			classUnderTest.all$()
				.subscribe(() => {
					expect(db.queryWithArrayResult).toHaveBeenCalledWith('SELECT * FROM reports ORDER BY id DESC');
					done();
				});
		});

	});

	describe('save', () => {

		let report: Report = new Report();

		it('should call insert on db', done => {

			classUnderTest.save(report)
				.then(() => {
					expect(db.insert).toHaveBeenCalledWith(Report.tableName, report);
					done();
				});
		});
	});

	describe('delete', () => {
		let report: Report = Report.create({id: 1});

		it('should query dbService', done => {
			classUnderTest.delete(report)
				.then(() => {
					expect(db.query).toHaveBeenCalledWith( `DELETE FROM ${Report.tableName} WHERE id = ?`, [1]);
					done();
				});
		});

		it('should call deleteAll on expenseService', done => {
			classUnderTest.delete(report)
				.then(() => {
					expect(expenseSrvc.deleteAll).toHaveBeenCalledWith(report);
					done();
				});
		});
	});

	describe('submit', () => {
		let report: Report;

		beforeEach(() => {
			report = Report.create({id: 1});
		});

		it('it should set report to submitted', () => {

			classUnderTest.submit(report)
				.then(() => {
					expect(report.status).toEqual(1);
				});
		});
	});
});
