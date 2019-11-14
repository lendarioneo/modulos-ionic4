import {NgModule} from '@angular/core';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {RouteReuseStrategy} from '@angular/router';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Geolocation} from '@ionic-native/geolocation/ngx';

/**
 * Módulo responsável por organizar os demais modulos que são singletons em toda aplicação.
 * É utilizado pelo appModule.
 */
@NgModule({
    imports: [
        IonicModule.forRoot()
    ],
    exports: [
        IonicModule,
        BrowserModule,
        BrowserAnimationsModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        Geolocation
    ]
})
export class CoreModule {
}
