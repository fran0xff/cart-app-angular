import { Component, EventEmitter, Input } from '@angular/core';
import { CartItem } from '../../models/cartitem';
import { Router } from '@angular/router';
import { SharingData } from '../../services/sharing-data';

@Component({
  selector: 'cart',
  imports: [],
  templateUrl: './cart.html',
})
export class Cart {
  
  items: CartItem[] = [];
  
  total: number = 0;
  
  

  constructor(private sharingData: SharingData, private router: Router) {
    this.items = this.router.getCurrentNavigation()?.extras.state!['items'];
    this.total = this.router.getCurrentNavigation()?.extras.state!['total'];
  }
 
  onDeleteCart(id: number) {
    this.sharingData.idProductEventEmitter.emit(id);
  }
 
}
