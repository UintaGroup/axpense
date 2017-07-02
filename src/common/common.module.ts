import { NgModule }                                         from '@angular/core';
import { IonicModule }                                      from 'ionic-angular';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';

import { COMMON_PROVIDERS }                                 from './providers';
import { COMMON_DIRECTIVES }                                from './components';

@NgModule({
	declarations: [
		COMMON_DIRECTIVES
	],
	imports: [
		TranslateModule,
		IonicModule
	],
	exports: [
		TranslatePipe,
		COMMON_DIRECTIVES
	],
	providers: [
		TranslateService,
		COMMON_PROVIDERS
	]
})
export class CommonModule {}