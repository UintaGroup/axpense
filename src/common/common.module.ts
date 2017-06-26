import { ModuleWithProviders, NgModule }                    from '@angular/core';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { COMMON_PROVIDERS }                                 from './providers';
@NgModule({
	imports: [
		TranslateModule
	],
	exports: [
		TranslatePipe
	],
	providers: [
		TranslateService,
		COMMON_PROVIDERS
	]
})
export class CommonModule {
	static forChild(page: any): ModuleWithProviders {
		return {
			ngModule: CommonModule
		};
	}
}