import {AfterContentInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

declare var google;

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterContentInit {

    public map;
    @ViewChild('mapElement', null) mapElement;

    constructor() {
    }

    ngOnInit(): void {
    }

    ngAfterContentInit(): void {
        this.map = new google.maps.Map(
            this.mapElement.nativeElement, {
                center: {
                    lat: -1.3636494,
                    lng: -48.4016722
                },
                zoom: 8
            });
    }
}
