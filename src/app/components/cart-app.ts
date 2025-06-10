import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

@Component({
  selector: 'cart-app',
  imports: [],
  templateUrl: './cart-app.html',
})
export class CartApp {

  productos:  Product[] = [];
  constructor(private service: ProductService){

  }

}
