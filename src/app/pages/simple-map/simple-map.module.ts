import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SimpleMapPage} from './simple-map.page';
import {SharedModule} from '../../shared/shared.module';
import {HeaderPageModule} from '../../components/header-page/header-page.module';

const routes: Routes = [
    {
        path: '',
        component: SimpleMapPage
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        HeaderPageModule
    ],
    declarations: [SimpleMapPage]
})
export class SimpleMapPageModule {
}
