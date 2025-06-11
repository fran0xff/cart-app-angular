import { Component, Input, input } from '@angular/core';
import { CartItem } from '../../models/cartitem';

@Component({
  selector: 'cart',
  imports: [],
  templateUrl: './cart.html',
})
export class Cart {

  @Input() items: CartItem[] = [];



}
