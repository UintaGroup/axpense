import { OpaqueToken } from '@angular/core';

export let APP_CONFIG = new OpaqueToken('app.config');

export interface AppConfig {
	appSetting: string;
	staticApiUrl: string;
}

export const CONFIG: AppConfig = {
	appSetting: 'my application setting',
	staticApiUrl: 'https://dl.dropboxusercontent.com/u/29534952/api/axpense/'
};