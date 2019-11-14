import {Component} from '@angular/core';

import {NavController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {NavigationExtras} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    menuId = 'main-menu';
    pages: {
        url: string,
        name: string,
        icon: string
    }[];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private navCtrl: NavController
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.pages = [
            {name: 'Mapa Simples', url: '/simple-map', icon: 'map'},
            {name: 'Geolocalização', url: '/geolocation', icon: 'locate'},
            {name: 'Marcador Customizado', url: '/custom-marker', icon: 'pin'}
        ];

        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    async goTo(url: string, title: string) {
        let navigationExtras: NavigationExtras = {
            state: {
                title: title
            }
        };
        await this.navCtrl.navigateForward([url], navigationExtras);
    }
}
