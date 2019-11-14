import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Geolocation} from '@ionic-native/geolocation/ngx';

declare const google;

@Component({
    selector: 'app-directions',
    templateUrl: './directions.page.html',
    styleUrls: ['./directions.page.scss'],
})
export class DirectionsPage implements OnInit, AfterViewInit {

    @ViewChild('mapElement', null) mapElement: ElementRef;

    title: string = 'Direções';
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;
    directionsForm: FormGroup;
    myPosition: {
        latitude: number,
        longitude: number
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

    private initMap() {
        this.geolocation.getCurrentPosition()
            .then(resp => {
                this.myPosition = {
                    longitude: resp.coords.longitude,
                    latitude: resp.coords.latitude
                };

                const map = new google.maps.Map(
                    this.mapElement.nativeElement, {
                        zoom: 14,
                        center: {
                            latitude: this.myPosition.latitude,
                            longitude: this.myPosition.longitude
                        }
                    }
                );

                const pos = {
                    lat: this.myPosition.latitude,
                    lng: this.myPosition.longitude
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
            source: ['', Validators.required],
            destination: ['', Validators.required]
        });
    }

    calculateAndDisplayRoute(formsValues: any) {
        const that = this;

        let parameterRoute = {
            origin: formsValues.source,
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
