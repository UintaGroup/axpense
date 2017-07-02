// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getTestBed, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import {
	App, Config, Form, IonicModule, Keyboard, DomController, MenuController, NavController, Platform,
	GestureController
} from 'ionic-angular';
import { ConfigMock, FormMock, PlatformMock, TranslatePipeMock, TranslateServiceMock } from './mocks';
import { CommonModule } from './common/common.module';
import { NavControllerMock } from 'ionic-mocks';
import { TranslateService } from '@ngx-translate/core';

// Unfortunately there's no typing for the `__karma__` variable. Just declare it as any.
declare var __karma__: any;
declare var require: any;

// Prevent Karma from running prematurely.
__karma__.loaded = function (): void {
	// noop
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
	BrowserDynamicTestingModule,
	platformBrowserDynamicTesting(),
);
// Then we find all the tests.
const context: any = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
// Finally, start Karma to run the tests.
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
			App, Form, Keyboard, DomController, GestureController, MenuController,
			{provide: Config, useClass: ConfigMock},
			{provide: TranslateService, useFactory: (TranslateServiceMock.instance)},
			{provide: Platform, useClass: PlatformMock},
		];

		let providers: any[] = coreProviders.concat(componentProviders);

		return TestBed.configureTestingModule({
				imports: [IonicModule, CommonModule],
				declarations: [components, TranslatePipeMock],
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
