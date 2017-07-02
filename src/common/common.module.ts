import { NgModule }                                         from '@angular/core';
import { IonicModule }                                      from 'ionic-angular';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';

import { COMMON_PROVIDERS }                                 from './providers';
import { COMMON_DIRECTIVES }                                from './components';
import { COMMON_PIPES } from './pipes/index';

@NgModule({
	declarations: [
		COMMON_DIRECTIVES,
		COMMON_PIPES
	],
	imports: [
		TranslateModule,
		IonicModule
	],
	exports: [
		TranslatePipe,
		COMMON_DIRECTIVES,
		COMMON_PIPES
	],
	providers: [
		TranslateService,
		COMMON_PROVIDERS
	]
})
export class CommonModule {}