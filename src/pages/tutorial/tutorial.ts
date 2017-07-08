import { Component }                                from '@angular/core';
import { MenuController, NavController, Slides }    from 'ionic-angular';
import { TranslateService }                         from '@ngx-translate/core';
import { WelcomePage }                              from '../welcome/welcome';

export interface Slide {
	title: string;
	description: string;
	image: string;
}

@Component({
	selector: 'page-tutorial',
	templateUrl: 'tutorial.html'
})
export class TutorialPage {
	public slides: Slide[];
	public showSkip: boolean = true;

	constructor(private _navCtrl: NavController, private _menuCtrl: MenuController, translate: TranslateService) {
		translate.get(['CONTENT.TUTORIAL.SLIDE1_TITLE',
				'CONTENT.TUTORIAL.SLIDE1_DESCRIPTION',
				'CONTENT.TUTORIAL.SLIDE2_TITLE',
				'CONTENT.TUTORIAL.SLIDE2_DESCRIPTION',
				'CONTENT.TUTORIAL.SLIDE3_TITLE',
				'CONTENT.TUTORIAL.SLIDE3_DESCRIPTION',
			])
			.subscribe(values => {
				this.slides = [
					{
						title: values['CONTENT.TUTORIAL.SLIDE1_TITLE'],
						description: values['CONTENT.TUTORIAL.SLIDE1_DESCRIPTION'],
						image: 'assets/img/ica-slidebox-img-1.png',
					},
					{
						title: values['CONTENT.TUTORIAL.SLIDE2_TITLE'],
						description: values['CONTENT.TUTORIAL.SLIDE2_DESCRIPTION'],
						image: 'assets/img/ica-slidebox-img-2.png',
					},
					{
						title: values['CONTENT.TUTORIAL.SLIDE3_TITLE'],
						description: values['CONTENT.TUTORIAL.SLIDE3_DESCRIPTION'],
						image: 'assets/img/ica-slidebox-img-3.png',
					}
				];
			});
	}

	public startApp(): Promise<any> {
		return this._navCtrl.setRoot(WelcomePage, {}, {
			animate: true,
			direction: 'forward'
		});
	}

	public onSlideChangeStart(slider: Slides): void {
		this.showSkip = !slider.isEnd;
	}

	public ionViewDidEnter(): any {
		this._menuCtrl.enable(false);
	}

	public ionViewWillLeave(): any {
		this._menuCtrl.enable(true);
	}

}
