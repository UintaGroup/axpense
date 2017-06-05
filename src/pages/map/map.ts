import { Component, ViewChild }           from '@angular/core';
import { Platform }                       from 'ionic-angular';
import { GoogleMaps, GoogleMap, LatLng }  from '@ionic-native/google-maps';

declare var google: any;

@Component({
	selector: 'page-map',
	templateUrl: 'map.html'
})
export class MapPage {

	@ViewChild('map') map;
	private _gMap: GoogleMap;

	constructor(private _platform: Platform, private _googleMap: GoogleMaps) {
	}

	initJSMaps(mapEle) {
		new google.maps.Map(mapEle, {
			center: {lat: 43.071584, lng: -89.380120},
			zoom: 16
		});
	}

	initNativeMaps(mapEle) {
		this._gMap = this._googleMap.create(mapEle);
		mapEle.classList.add('show-map');

		this.map.isAvailable().then(() => {
			const position = new LatLng(43.074395, -89.381056);
			this.map.setPosition(position);
		});
	}

	ionViewDidLoad() {
		let mapEle = this.map.nativeElement;

		if (!mapEle) {
			console.error('Unable to initialize map, no map element with #map view reference.');
			return;
		}

		if (this._platform.is('cordova') === true) {
			this.initNativeMaps(mapEle);
		} else {
			this.initJSMaps(mapEle);
		}
	}

}
