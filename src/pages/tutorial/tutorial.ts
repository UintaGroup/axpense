import { Component } from '@angular/core';

import { MenuController, NavController } from 'ionic-angular';

import { WelcomePage } from '../welcome/welcome';

import { TranslateService } from '@ngx-translate/core';



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
  slides: Slide[];
  showSkip = true;

  constructor(public navCtrl: NavController, public menu: MenuController, translate: TranslateService) {
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

  startApp() {
    this.navCtrl.setRoot(WelcomePage, {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }

  ionViewDidEnter() {
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    this.menu.enable(true);
  }

}
