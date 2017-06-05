import { StatusBar }    from "@ionic-native/status-bar";
import { SplashScreen } from '@ionic-native/splash-screen';
import { GoogleMaps }   from '@ionic-native/google-maps';
import { Camera }       from "@ionic-native/camera";
import { SQLite }       from '@ionic-native/sqlite';

export const NATIVE_PLUGINS = [
	GoogleMaps,
	Camera,
	SplashScreen,
	StatusBar,
	SQLite
];