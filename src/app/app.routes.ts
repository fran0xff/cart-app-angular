import { Routes } from '@angular/router';
import { Cart } from './components/cart/cart';
import { Catalog } from './components/catalog/catalog';

export const routes: Routes = [

    { path: '', redirectTo: '/catalog', pathMatch: 'full' },
    { path: 'cart', component: Cart},
    { path: 'catalog', component: Catalog}
];
