import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';

import { getTestBed, TestBed }                                              from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting }       from '@angular/platform-browser-dynamic/testing';
import { TranslateService }                                                 from '@ngx-translate/core';
import { App, Config, Form, IonicModule, Keyboard, Platform }               from 'ionic-angular';
import { DomController, MenuController, GestureController }                 from 'ionic-angular';
import { ConfigMock, FormMock, MenuControllerMock, PlatformMock, KeyboardMock }   from 'ionic-mocks/src';
import { TranslateServiceMock, TranslatePipeMock }                          from './mocks/ngx-translate';
import { ReportTotalComponentMock }                                         from './mocks/report-total.component.mock';
import { CommonModule }                                                     from './common';

declare let __karma__: any;
declare let require: any;

__karma__.loaded = function (): void {/* */};

getTestBed().initTestEnvironment(
	BrowserDynamicTestingModule,
	platformBrowserDynamicTesting(),
);

const context: any = require.context('./', true, /\.spec\.ts$/);
context.keys().map(context);
__karma__.start();

export class TestUtils {

	public static beforeEachCompiler(components: any[], providers: any[]): Promise<{ fixture: any, instance: any }> {
		return TestUtils.configureIonicTestingModule(components, providers)
			.compileComponents().then(() => {
				let fixture: any = TestBed.createComponent(components[0]);
				return {
					fixture: fixture,
					instance: fixture.debugElement.componentInstance,
				};
			});
	}

	public static configureIonicTestingModule(components: Array<any>, componentProviders: any[]): typeof TestBed {
		let coreProviders: any[] = [
			App,
			DomController,
			GestureController,
			{provide: Keyboard, useFactory: () => KeyboardMock.instance()},
			{provide: MenuController, useFactory: () => MenuControllerMock.instance()},
			{provide: Form, useFactory: () => FormMock.instance()},
			{provide: Config, useFactory: () => ConfigMock.instance()},
			{provide: TranslateService, useFactory: (TranslateServiceMock.instance)},
			{provide: Platform, useFactory: () => PlatformMock.instance()},
		];

		let providers: any[] = coreProviders.concat(componentProviders);

		return TestBed.configureTestingModule({
				imports: [IonicModule, CommonModule],
				declarations: [components, TranslatePipeMock, ReportTotalComponentMock ],
				providers: providers
			});
	}

	// http://stackoverflow.com/questions/2705583/how-to-simulate-a-click-with-javascript
	public static eventFire(el: any, etype: string): void {
		if (el.fireEvent) {
			el.fireEvent('on' + etype);
		} else {
			let evObj: any = document.createEvent('Events');
			evObj.initEvent(etype, true, false);
			el.dispatchEvent(evObj);
		}
	}
}
