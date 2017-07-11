import { ReportStatusPipe } from './report-status.pipe';

describe('ReportStatusPipe', () => {

	let classUnderTest: ReportStatusPipe;

	beforeEach(() => {

		classUnderTest = new ReportStatusPipe();
	});

	it('should initialize', () => {

		expect(classUnderTest).toBeDefined();
	});

	describe('transform', () => {

		it('should return Submitted for status 1', () => {
		   expect(classUnderTest.transform(1)).toEqual('Submitted');
		});

		it('should return Open for all other values', () => {
			expect(classUnderTest.transform('22')).toEqual('Open');
			expect(classUnderTest.transform(undefined)).toEqual('Open');
			expect(classUnderTest.transform('invalid')).toEqual('Open');
		});
	})

});