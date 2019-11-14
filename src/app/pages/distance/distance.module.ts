import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DistancePage} from './distance.page';
import {HeaderPageModule} from '../../components/header-page/header-page.module';
import {SharedModule} from '../../shared/shared.module';

const routes: Routes = [
    {
        path: '',
        component: DistancePage
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        HeaderPageModule
    ],
    declarations: [DistancePage]
})
export class DistancePageModule {
}
