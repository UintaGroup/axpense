export class LocalDbMock {
	public static instance(): any {
		let instance: any = jasmine.createSpyObj('LocalDb', [
			'queryWithBuilder',
			'query',
			'queryWithArrayResult',
			'get',
			'set',
			'allKeys',
			'removeKvp',
			'removeAllKvp',
			'resetDb',
			'initialize',
			'dropAndCreate',
			'seedTable',
			'insert']);

		instance.queryWithBuilder.and.returnValue(Promise.resolve());
		instance.query.and.returnValue(Promise.resolve());
		instance.queryWithArrayResult.and.returnValue(Promise.resolve([]));
		instance.get.and.returnValue(Promise.resolve());
		instance.set.and.returnValue(Promise.resolve());
		instance.allKeys.and.returnValue(Promise.resolve());
		instance.removeKvp.and.returnValue(Promise.resolve());
		instance.resetDb.and.returnValue(Promise.resolve());
		instance.initialize.and.returnValue(Promise.resolve());
		instance.dropAndCreate.and.returnValue(Promise.resolve());
		instance.seedTable.and.returnValue(Promise.resolve());
		instance.insert.and.returnValue(Promise.resolve({res: {insertId: 1}}));

		return instance;
	}
}