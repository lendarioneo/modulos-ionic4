import {NgModule} from '@angular/core';
import {HeaderPageComponent} from './header-page.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
    declarations: [HeaderPageComponent],
    exports: [
        HeaderPageComponent
    ],
    imports: [
        SharedModule
    ]
})
export class HeaderPageModule {
}
