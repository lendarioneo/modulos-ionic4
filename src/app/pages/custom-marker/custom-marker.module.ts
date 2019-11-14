import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CustomMarkerPage } from './custom-marker.page';
import {HeaderPageModule} from '../../components/header-page/header-page.module';

const routes: Routes = [
  {
    path: '',
    component: CustomMarkerPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        HeaderPageModule
    ],
  declarations: [CustomMarkerPage]
})
export class CustomMarkerPageModule {}
