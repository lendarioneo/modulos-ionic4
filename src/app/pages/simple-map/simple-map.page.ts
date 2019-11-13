import {AfterContentInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

declare var google;

@Component({
    selector: 'app-simple-map',
    templateUrl: './simple-map.page.html',
    styleUrls: ['./simple-map.page.scss'],
})
export class SimpleMapPage implements OnInit, AfterContentInit {

    title: string;

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
