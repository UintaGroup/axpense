import { StatusBar }    from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera }       from '@ionic-native/camera';
import { SQLite }       from '@ionic-native/sqlite';

export const NATIVE_PLUGINS: any[] = [
	Camera,
	SplashScreen,
	StatusBar,
	SQLite
];
