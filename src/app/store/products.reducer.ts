import { createReducer, on } from '@ngrx/store';
import { finddAll, load } from './products.actions';
import { Product } from '../models/product';

const products: Product[] = [];

const initialState = {
    products
}

export const productsReducer = createReducer(
    initialState,
    on(load, (state)=> ({products: [... state.products]})),
    on(finddAll, (state, {products}) => ({products: [... products]})),
)