/**
 * @author Paulo Weskley de Almeida Ferreira
 * Date: 2019/11/13
 */

import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {Router} from '@angular/router';

declare var google;

@Component({
    selector: 'app-custom-marker',
    templateUrl: './custom-marker.page.html',
    styleUrls: ['./custom-marker.page.scss'],
})
export class CustomMarkerPage implements OnInit, AfterViewInit {

    title: string = 'Marcador Customizado';

    /* Atributo-objeto responsável por armazenar as coordenadas atuais do dispositivo*/
    mYposition: {
        latitude: number,
        longitude: number
    };

    /* Responsável por linkar o elemento no dom com a informação que vem do Google Maps, servindo de ponte
    para renderizar o Mapa*/
    @ViewChild('mapElement', null) mapNativeElement: ElementRef;

    constructor(
        private geolocation: Geolocation,
        private router: Router) {
    }

    ngOnInit() {
        this.getExtras();
    }

    ngAfterViewInit(): void {
        this.initMap();
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

    private initMap() {
        /* Permite pegar a posição atual do aparelho e guardar em uma variavel para manipular posteriormente. */
        this.geolocation.getCurrentPosition()
            .then(resp => {

                /* As posições são guardadas no atributo da classe.*/
                this.mYposition = {
                    latitude: resp.coords.latitude,
                    longitude: resp.coords.longitude
                };

                /* Elemento responsável por configurar o Maps.
                * Deve-se passar como parametro o elemento do dom, o MapElement e um objeto referente aos parametros do mapa,
                * como: Latitude e Longitude da posicao que deve iniciar o mapa, além do zoom.
                *  */
                const map = new google.maps.Map(
                    this.mapNativeElement.nativeElement,
                    {
                        center: {
                            latitude: this.mYposition.latitude,
                            longitude: this.mYposition.longitude
                        },
                        zoom: 14
                    }
                );

                /* O Marcador recebe a longitude e latitude passadas pelo usuario */
                const pos = {
                    lat: this.mYposition.latitude,
                    lng: this.mYposition.longitude
                };
                map.setCenter(new google.maps.LatLng(pos.lat, pos.lng));

                /*Customizar o Marcador*/
                const icon = {
                    url: 'http://maps.google.com/mapfiles/kml/pal4/icon25.png',
                    scaledsize: new google.maps.Size(50, 50)
                };

                const marker = new google.maps.Marker({
                    position: pos,
                    map: map,
                    title: 'Informações',
                    icon: icon
                });

                const contentString =
                    `<ion-card>
                        <ion-card-header>
                            <ion-card-subtitle>Titulo</ion-card-subtitle>
                        </ion-card-header>
                        <ion-card-content>
                            <ion-img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS0xNLNV1H5aLM7xLLacigOLdSaOYpJFfYHhf-5WZG3cgYU42M&s">
                        </ion-card-content>
                    </ion-card>`;

                /* É criado um balão informativo (A confirmar) */
                const infoWindow = new google.maps.InfoWindow({
                    content: contentString,
                    maxWidth: 150,
                    maxHeight: 100
                });

                marker.addListener('click', () => {
                    infoWindow.open(map, marker);
                });
            })
            .catch(error => {
                console.log('Error getting location ', error);
            });
    }
}
