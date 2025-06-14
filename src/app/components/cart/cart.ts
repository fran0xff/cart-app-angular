import { Component, EventEmitter, Input, input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CartItem } from '../../models/cartitem';

@Component({
  selector: 'cart',
  imports: [],
  templateUrl: './cart.html',
})
export class Cart implements OnChanges{
  
  @Input() items: CartItem[] = [];
  total: number = 0;
  
  @Output() idProductEventEmitter = new EventEmitter();
  
  ngOnChanges(changes: SimpleChanges): void {
    //let itemsChanges = changes['items'];
    this.calculateTotal();
    this.saveSession();
  }
  onDeleteCart(id: number) {
    this.idProductEventEmitter.emit(id);
  }
  calculateTotal(): void {
    this.total = this.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }
}
