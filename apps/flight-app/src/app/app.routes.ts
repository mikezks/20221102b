import { Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { BasketComponent } from './basket/basket.component';
import { HomeComponent } from './home/home.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  ...(
    environment.oem === 'mazda' ? [{
      path: 'mazda',
      loadChildren: () => import('./mazda')
        .then(esm => esm.MazdaModule)
    }] : []
  ),
  ...(
    environment.oem === 'toyota' ? [{
      path: 'toyota',
      loadChildren: () => import('./toyota')
        .then(esm => esm.ToyotaModule)
    }] : []
  ),
  {
    path: 'basket',
    component: BasketComponent,
    outlet: 'aux'
  }
  {
    path: '**',
    redirectTo: 'home'
  }
];
