import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { Catalog } from './catalog/catalog';

@Component({
  selector: 'cart-app',
  imports: [Catalog],
  templateUrl: './cart-app.html',
})
export class CartApp implements OnInit {

  products:  Product[] = [];

  constructor(private service: ProductService){

  }
  
  ngOnInit(): void {
    this.products = this.service.findAll();
  }

}
