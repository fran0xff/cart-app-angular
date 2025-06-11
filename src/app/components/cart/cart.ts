import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { CartItem } from '../../models/cartitem';

@Component({
  selector: 'cart',
  imports: [],
  templateUrl: './cart.html',
})
export class Cart {

  @Input() items: CartItem[] = [];
  @Input() total: number = 0;

  @Output() idProductEventEmitter = new EventEmitter();

  onDeleteCart(id: number) {
    this.idProductEventEmitter.emit(id);
  }
}
