import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCard } from '../product-card/product-card';
import { SharingData } from '../../services/sharing-data';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'catalog',
  imports: [ProductCard],
  templateUrl: './catalog.html',
})
export class Catalog implements OnInit{

  products!: Product[];

  constructor(
    private productService: ProductService,
    private sharingData: SharingData) {}

  ngOnInit(): void {  
      this.products = this.productService.findAll();  
  }

  onAddCart(product: Product) {
    this.sharingData.productEventEmitter.emit(product);
  }

}
