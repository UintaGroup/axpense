import { Injectable } from '@angular/core';
import { Storage }    from '@ionic/storage';

@Injectable()
export class SettingsService {

	public settings: any[];

	private _defaults: any;
	private SETTINGS_KEY: string = '_settings';

	constructor(public storage: Storage, defaults: any) {
		this._defaults = defaults;
	}

	public load(): Promise<void> {
		return this.storage.get(this.SETTINGS_KEY)
			.then(value => {
				if (value) {
					this.settings = value;
					return this.mergeDefaults(this._defaults);
				} else {
					return this.setAll(this._defaults)
						.then(val => this.settings = val);
				}
			});
	}

	public merge(settings: any): Promise<any> {
		for (let k in settings) {
			this.settings[k] = settings[k];
		}
		return this.save();
	}

	public setValue(key: string, value: any): Promise<any> {
		this.settings[key] = value;
		return this.storage.set(this.SETTINGS_KEY, this.settings);
	}

	public setAll(value: any): Promise<any> {
		return this.storage.set(this.SETTINGS_KEY, value);
	}

	public getValue(key: string): Promise<any> {
		return this.storage.get(this.SETTINGS_KEY)
			.then(settings => settings[key]);
	}

	public save(): Promise<any> {
		return this.setAll(this.settings);
	}

	get allSettings(): any[] {
		return this.settings;
	}

	private mergeDefaults(defaults: any): Promise<any> {
		for (let k in defaults) {
			if (!(k in this.settings)) {
				this.settings[k] = defaults[k];
			}
		}
		return this.setAll(this.settings);
	}
}
