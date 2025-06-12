import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cartitem';

@Component({
  selector: 'navbar',
  imports: [],
  templateUrl: './navbar.html',
})
export class Navbar {

  @Input() items: CartItem[] = [];

  @Output() openEventEmitter = new EventEmitter();

  openCart(): void{
    this.openEventEmitter.emit();

  }


}
