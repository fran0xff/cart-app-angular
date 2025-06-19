import { Component, OnInit } from '@angular/core';
import { CartItem } from '../models/cartitem';
import { Navbar } from './navbar/navbar';
import { Router, RouterOutlet } from '@angular/router';
import { SharingData } from '../services/sharing-data';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { ItemsState } from '../store/items.reducer';
import { add, remove, total } from '../store/items.action';

@Component({
  selector: 'cart-app',
  imports: [Navbar, RouterOutlet],
  templateUrl: './cart-app.html',
})
export class CartApp implements OnInit {

  items: CartItem[] = [];

  constructor(
    private store: Store<{items: ItemsState}>,
    private router: Router,
    private sharingData: SharingData) {
      this.store.select('items').subscribe(items => {
        this.items = items.items;
        this.saveSession();
      })
     }

  ngOnInit(): void {
    this.store.dispatch(total());
    this.onDeleteCart();
    this.onAddCart();
  }

  onAddCart(): void {
    this.sharingData.productEventEmitter.subscribe(product => {
      this.store.dispatch(add({ product: product}))
      this.store.dispatch(total());
      this.router.navigate(['/cart']);

      Swal.fire({
        title: 'Producto agregado',
        text: 'El producto ha sido agregado al carrito',
        icon: 'success',
        timer: 2000
      });
    });
  }


  onDeleteCart(): void {
    this.sharingData.idProductEventEmitter.subscribe(id => {
      console.log(id + ' se ha ejecutado el evento de idProductEventEmitter');
      Swal.fire({
        title: '¿Estás seguro de que quieres eliminar el producto?',
        text: 'Si eliminas el producto, no se podrá recuperar',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch(remove({ id: id }));
          this.store.dispatch(total());
          this.router.navigate(['/cart']);
          Swal.fire({
            title: 'Eliminado',
            text: 'El producto ha sido eliminado',
            icon: 'success',
            timer: 2000
        });
        }
      });
    });
  }

saveSession(): void {
  sessionStorage.setItem('cart', JSON.stringify(this.items));
}

}
