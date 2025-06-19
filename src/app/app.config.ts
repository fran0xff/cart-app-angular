import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { itemsReducer } from './store/items.reducer';
import { provideStore } from '@ngrx/store';
import { productsReducer } from './store/products.reducer';
import { provideEffects } from '@ngrx/effects';
import { ProductsEffects } from './store/effects/products.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideStore({
        items: itemsReducer,
        products: productsReducer,
    }),
    provideEffects(ProductsEffects)]
};
