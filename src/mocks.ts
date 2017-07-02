/* tslint:disable */
import { ObjectUnsubscribedError, Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import {} from 'jasmine';
import { Report } from './models/report.model';

export class ConfigMock {

	public get(): any {
		return '';
	}

	public getBoolean(): boolean {
		return true;
	}

	public getNumber(): number {
		return 1;
	}

	public setTransition(any?: any): any {
	}
}

export class FormMock {
	public register(): any {
		return true;
	}
}

export class PlatformMock {
	public ready(): Promise<{ String }> {
		return new Promise((resolve) => {
			resolve('READY');
		});
	}

	public registerBackButtonAction(fn: Function, priority?: number): Function {
		return (() => true);
	}

	public hasFocus(ele: HTMLElement): boolean {
		return true;
	}

	public doc(): HTMLDocument {
		return document;
	}

	public is(): boolean {
		return true;
	}

	public getElementComputedStyle(container: any): any {
		return {
			paddingLeft: '10',
			paddingTop: '10',
			paddingRight: '10',
			paddingBottom: '10',
		};
	}

	public onResize(callback: any) {
		return callback;
	}

	public registerListener(ele: any, eventName: string, callback: any): Function {
		return (() => true);
	}

	public win(): Window {
		return window;
	}

	public raf(callback: any): number {
		return 1;
	}

	public timeout(callback: any, timer: number): any {
		return setTimeout(callback, timer);
	}

	public cancelTimeout(id: any) {
		// do nothing
	}

	public getActiveElement(): any {
		return document['activeElement'];
	}
}

export class TranslateServiceMock {
	public get(key: string): Observable<any> {
		return Observable.of({});
	}
}

export class NavControllerMock {
	public pop(component: any): Promise<any> {
		return Promise.resolve();
	}
}

@Pipe({name: 'translate'})
export class TranslatePipeMock implements PipeTransform {
	public transform(): string {
		return '';
	}
}

export class ReportServiceMock {

	public static instance(): any {
		let instance = jasmine.createSpyObj('ReportServiceMock', ['all']);
		instance.all$.and.returnValue(Observable.from([]));
		instance.all.and.returnValue(Promise.resolve([]));
		instance.save.and.returnValue(Promise.resolve([]));
		instance.delete.and.returnValue(Promise.resolve([]));

		return instance;
	}
}

export class LocalDbMock {
	public static instance(): any {
		let instance = jasmine.createSpyObj('LocalDb', [
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
		instance.insert.and.returnValue(Promise.resolve());

		return instance;
	}
}



export class FirebaseServiceMock {
	public static instance(): any {
		let instance = jasmine.createSpyObj('FirebaseService', ['setUserId', 'setScreenName', 'logEvent', 'logError', 'getInfo']);
		instance.getInfo.and.returnValue(Promise.resolve());

		return instance;
	}
}
/* tslint:enable */