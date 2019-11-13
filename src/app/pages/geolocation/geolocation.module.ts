import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {GeolocationPage} from './geolocation.page';
import {SharedModule} from '../../shared/shared.module';

const routes: Routes = [
    {
        path: '',
        component: GeolocationPage
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [GeolocationPage]
})
export class GeolocationModule {
}
