import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DirectionsPage} from './directions.page';
import {HeaderPageModule} from '../../components/header-page/header-page.module';
import {SharedModule} from '../../shared/shared.module';

const routes: Routes = [
    {
        path: '',
        component: DirectionsPage
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        HeaderPageModule
    ],
    declarations: [DirectionsPage]
})
export class DirectionsPageModule {
}
