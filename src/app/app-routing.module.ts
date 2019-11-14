import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'simple-map',
        pathMatch: 'full'
    },
    {
        path: 'simple-map',
        loadChildren: () => import('./pages/simple-map/simple-map.module').then(m => m.SimpleMapPageModule)
    },
    {
        path: 'geolocation',
        loadChildren: () => import('./pages/geolocation/geolocation.module').then(m => m.GeolocationModule)
    },
    {
        path: 'custom-marker',
        loadChildren: () => import('./pages/custom-marker/custom-marker.module').then(m => m.CustomMarkerPageModule)
    },
    {
        path: 'directions', loadChildren: () => import('./pages/directions/directions.module').then(m => m.DirectionsPageModule)
    },

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
