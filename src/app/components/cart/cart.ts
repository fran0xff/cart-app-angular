import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../models/cartitem';
import { SharingData } from '../../services/sharing-data';
import { State, Store } from '@ngrx/store';
import { ItemsState } from '../../store/items.reducer';

@Component({
  selector: 'cart',
  imports: [],
  templateUrl: './cart.html',
})
export class Cart implements OnInit {
  
  items: CartItem[] = [];
  
  total: number = 0;
  
  

  constructor(
    private store: Store<{items: ItemsState}>,
    private sharingData: SharingData) {
    this.store.select('items').subscribe((state) => {
      this.items = state.items;
      this.total = state.total;
    })

  }
  ngOnInit(): void {
   
  }
 
  onDeleteCart(id: number) {
    this.sharingData.idProductEventEmitter.emit(id);
  }
 
}
