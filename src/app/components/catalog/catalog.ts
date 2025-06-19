import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCard } from '../product-card/product-card';
import { SharingData } from '../../services/sharing-data';
import { Store } from '@ngrx/store';
import { load } from '../../store/products.actions';

@Component({
  selector: 'catalog',
  imports: [ProductCard],
  templateUrl: './catalog.html',
})
export class Catalog implements OnInit{

  products!: Product[];

  constructor(
    private store: Store<{products: any}>,
    private sharingData: SharingData) {
      this.store.select('products').subscribe(state => this.products = state.products);
      
    }

  ngOnInit(): void {  
    this.store.dispatch(load());
  }

  onAddCart(product: Product) {
    this.sharingData.productEventEmitter.emit(product);
  }

}
