import {AfterContentInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';

declare const google;

@Component({
    selector: 'geolocation-page',
    templateUrl: './geolocation.page.html',
    styleUrls: ['./geolocation.page.scss'],
})
export class GeolocationPage implements OnInit, AfterContentInit {

    title: string;

    /* Elemento que vai renderizar o mapa*/
    // map: any;

    /* Atributo responsável por guardar a posição atual do dispositivo*/
    latitude: any;
    longitude: any;

    @ViewChild('mapElement', null) mapNativeElement: ElementRef;

    constructor(private geolocation: Geolocation) {
    }

    ngOnInit() {
    }

    ngAfterContentInit(): void {

        /*Deste modo é possivel pegar a posição atual do aparelho e guardar em uma variavel para manipular posteriormente.
        * */
        this.geolocation.getCurrentPosition()
            .then(resp => {

                /* As posições são guardadas no atributo da classe.*/
                this.latitude = resp.coords.latitude;
                this.longitude = resp.coords.longitude;

                /* No mapa é definida a posição inicial ao renderizar */
                const map = new google.maps.Map(
                    this.mapNativeElement.nativeElement,
                    {
                        center: {
                            latitude: -1.363779,
                            longitude: -48.401060
                        },
                        zoom: 8
                    }
                );

                /* É criado um balão informativo (A confirmar) */
                const infoWindow = new google.maps.InfoWindow;

                /*O Marcador recebe a longitude e latitude passadas pelo usuario*/
                const pos = {
                    lat: this.latitude,
                    lng: this.longitude
                };

                /* O Balão informativo recebe a posicao*/
                infoWindow.setPosition(pos);
                infoWindow.setContent('Sua Localização');
                infoWindow.open(map);
                map.setCenter(pos);
            })
            .catch(error => {
                console.log('Error getting location ', error);
            });
    }
}
