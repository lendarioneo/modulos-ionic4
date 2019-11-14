/**
 * @author Paulo Weskley de Almeida Ferreira
 * Date: 2019/11/13
 */

import {AfterContentInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

declare var google;

@Component({
    selector: 'app-simple-map',
    templateUrl: './simple-map.page.html',
    styleUrls: ['./simple-map.page.scss'],
})
export class SimpleMapPage implements OnInit, AfterContentInit {

    title: string = 'Mapa Simples';

    public map;
    @ViewChild('mapElement', null) mapElement;

    constructor(private activatedRoute: ActivatedRoute, private router: Router) {

    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(params => {
            let getNav = this.router.getCurrentNavigation();
            if (getNav.extras.state) {
                this.title = getNav.extras.state.title;
                console.log(this.title);
            }
        });
    }

    ngAfterContentInit(): void {
        this.initMap();
    }

    private initMap() {
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
