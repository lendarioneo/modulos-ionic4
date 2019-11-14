/**
 * @author Paulo Weskley de Almeida Ferreira
 * Date: 2019/11/13
 */

import {AfterContentInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {Router} from '@angular/router';

declare const google;

@Component({
    selector: 'geolocation-page',
    templateUrl: './geolocation.page.html',
    styleUrls: ['./geolocation.page.scss'],
})
export class GeolocationPage implements OnInit, AfterContentInit {

    title: string = 'Geolocalização';

    /* Elemento que vai renderizar o mapa*/
    // map: any;

    /* Atributo-objeto responsável por armazenar as coordenadas atuais do dispositivo*/
    mYposition: {
        latitude: number,
        longitude: number
    };

    @ViewChild('mapElement', null) mapNativeElement: ElementRef;

    constructor(
        private geolocation: Geolocation,
        private router: Router) {
    }

    ngOnInit() {
        this.getExtras();
    }

    ngAfterContentInit(): void {
        this.initMap();
    }

    initMap() {
        /*Deste modo é possivel pegar a posição atual do aparelho e guardar em uma variavel para manipular posteriormente.
        * */
        this.geolocation.getCurrentPosition()
            .then(resp => {

                /* As posições são guardadas no atributo da classe.*/
                this.mYposition = {
                    longitude: resp.coords.longitude,
                    latitude: resp.coords.latitude
                };

                /* No mapa é definida a posição inicial ao renderizar */
                const map = new google.maps.Map(
                    this.mapNativeElement.nativeElement,
                    {
                        center: {
                            latitude: this.mYposition.latitude,
                            longitude: this.mYposition.longitude
                        },
                        zoom: 12
                    }
                );

                /* É criado um balão informativo (A confirmar) */
                const infoWindow = new google.maps.InfoWindow;

                /*O Marcador recebe a longitude e latitude passadas pelo usuario*/
                const pos = {
                    lat: this.mYposition.latitude,
                    lng: this.mYposition.longitude
                };

                /* O Balão informativo recebe a posicao*/
                infoWindow.setPosition(pos);
                infoWindow.setContent(`Sua Localização`);
                infoWindow.open(map);
                map.setCenter(new google.maps.LatLng({lat: pos.lat, lng: pos.lng}));
            })
            .catch(error => {
                console.log('Error getting location ', error);
            });
    }

    /**
     * Método responsável por capturar as informações que são passadas pelo parametro para a rota atual
     */
    getExtras() {
        let currentNavigation = this.router.getCurrentNavigation();
        if (currentNavigation.extras.state) {
            this.title = currentNavigation.extras.state.title;
            console.log(this.title);
        }
    }
}
