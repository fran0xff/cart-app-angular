import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCard } from '../product-card/product-card';
import { Router } from '@angular/router';

@Component({
  selector: 'catalog',
  imports: [ProductCard],
  templateUrl: './catalog.html',
})
export class Catalog {

  products!: Product[];

  productEventEmitter: EventEmitter<Product> = new EventEmitter();

  constructor(private router: Router) {
    this.products = this.router.getCurrentNavigation()?.extras.state!['products'];
  }

  onAddCart(product: Product) {
    this.productEventEmitter.emit(product);
  }

}
