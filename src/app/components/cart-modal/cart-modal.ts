import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cart } from '../cart/cart';
import { CartItem } from '../../models/cartitem';

@Component({
  selector: 'cart-modal',
  imports: [Cart],
  templateUrl: './cart-modal.html',
})
export class CartModal {

  @Input() items: CartItem[] = [];
  // @Input() total: number = 0;

  @Output() idProductEventEmitter = new EventEmitter();
  @Output() closeEventEmitter = new EventEmitter();

  closeCart(): void{
    this.closeEventEmitter.emit();

  }
  onDeleteCart(id: number) {
    this.idProductEventEmitter.emit(id);
  }
}
