import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CustomMarkerPage} from './custom-marker.page';
import {HeaderPageModule} from '../../components/header-page/header-page.module';
import {SharedModule} from '../../shared/shared.module';

const routes: Routes = [
    {
        path: '',
        component: CustomMarkerPage
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        HeaderPageModule
    ],
    declarations: [CustomMarkerPage]
})
export class CustomMarkerPageModule {
}
