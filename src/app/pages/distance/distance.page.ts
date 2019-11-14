import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Geolocation} from '@ionic-native/geolocation/ngx';

declare var google;

@Component({
    selector: 'app-distance',
    templateUrl: './distance.page.html',
    styleUrls: ['./distance.page.scss'],
})
export class DistancePage implements OnInit, AfterViewInit {

    @ViewChild('mapElement', null) mapElement: ElementRef;

    title: string = 'Direções';
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;
    directionsForm: FormGroup;
    myPosition = {
        lat: 0,
        lng: 0
    };

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private geolocation: Geolocation) {
        this.createDirectionForm();
    }

    ngOnInit() {
        this.getExtras();
    }

    ngAfterViewInit(): void {
        this.initMap();
    }

    /**
     * Método responsável pela logica implementada no mapa.
     */
    private initMap() {

        /* Pega a posição atual do dispositivo */
        this.geolocation.getCurrentPosition()
            .then(resp => {
                this.myPosition = {
                    lng: resp.coords.longitude,
                    lat: resp.coords.latitude
                };

                /* Define os parametros do mapa como o elemento grafico que vai ficar o mapa, lat e long inicial e zoom*/
                const map = new google.maps.Map(
                    this.mapElement.nativeElement, {
                        zoom: 14,
                        center: {
                            latitude: this.myPosition.lat,
                            longitude: this.myPosition.lng
                        }
                    }
                );

                /* Define a posição que o marcador vai iniciar o marcador */
                const pos = {
                    lat: this.myPosition.lat,
                    lng: this.myPosition.lng
                };

                map.setCenter(new google.maps.LatLng({lat: pos.lat, lng: pos.lng}));
                this.directionsDisplay.setMap(map);
            });
    }

    getExtras() {
        let currentNav = this.router.getCurrentNavigation();
        if (currentNav.extras.state) {
            this.title = currentNav.extras.state.title;
        }
    }

    private createDirectionForm() {
        this.directionsForm = this.formBuilder.group({
            //source: ['', Validators.required],
            destination: ['', Validators.required]
        });
    }

    calculateAndDisplayRoute(formsValues: any) {
        const that = this;

        let parameterRoute = {
            origin: this.myPosition,
            destination: formsValues.destination,
            travelMode: 'DRIVING'
        };

        this.directionsService.route(parameterRoute, (resp, status) => {
            if (status == 'OK') {
                that.directionsDisplay.setDirections(resp);
            } else {
                window.alert('Falha ao requisitar a rota: ' + status);
            }
        });
    }
}
