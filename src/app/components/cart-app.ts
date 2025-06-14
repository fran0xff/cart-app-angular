import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { Catalog } from './catalog/catalog';
import { CartItem } from '../models/cartitem';
import { Navbar } from './navbar/navbar';
import { RouterOutlet } from '@angular/router';
import { SharingData } from '../services/sharing-data';

@Component({
  selector: 'cart-app',
  imports: [Catalog, Navbar, RouterOutlet],
  templateUrl: './cart-app.html',
})
export class CartApp implements OnInit {

  products: Product[] = [];

  items: CartItem[] = [];

  total: number = 0;

  constructor(private sharingData: SharingData, private service: ProductService) {

  }

  ngOnInit(): void {
    this.products = this.service.findAll();
    this.items = JSON.parse(sessionStorage.getItem('cart') || '[]');
    this.calculateTotal();
    this.onDeleteCart();
  }

  onAddCart(product: Product): void {
    const hasItem = this.items.find(item => item.product.id === product.id);

    if (hasItem) {
      this.items = this.items.map(item => {
        if (item.product.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1
          }
        }
        return item;
      })
    } else {
      this.items = [... this.items, { product: { ...product }, quantity: 1 }]
    }
    this.calculateTotal();
    this.saveSession();
  }

  onDeleteCart(): void {
    this.sharingData.idProductEventEmitter.subscribe(id => {
      console.log(id + ' se ha ejecutado el evento de idProductEventEmitter');
      this.items = this.items.filter(item => item.product.id !== id);
      if (this.items.length === 0) {
        sessionStorage.removeItem('cart');
        //sessionStorage.clear(); //elimina todo incluso la sesion de usuario por eso no es recomendable
      }
      this.calculateTotal();
      this.saveSession();

    })
  }

  calculateTotal(): void {
    this.total = this.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

}
