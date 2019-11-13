import {AfterContentInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {ActivatedRoute, Router} from '@angular/router';

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
    latitude: number;
    longitude: number;

    @ViewChild('mapElement', null) mapNativeElement: ElementRef;

    constructor(
        private geolocation: Geolocation,
        private activatedRoute: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(params => {
            let getNav = this.router.getCurrentNavigation();
            if (getNav.extras.state) {
                this.title = getNav.extras.state.title;
                console.log(this.title);
            }
        });
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
                            latitude: this.latitude,
                            longitude: this.longitude
                        },
                        zoom: 12
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
                infoWindow.setContent(`Sua Localização`);
                infoWindow.open(map);
                map.setCenter(new google.maps.LatLng(pos.lat, pos.lng));
            })
            .catch(error => {
                console.log('Error getting location ', error);
            });
    }
}
