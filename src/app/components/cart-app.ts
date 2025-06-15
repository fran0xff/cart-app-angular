import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Catalog } from './catalog/catalog';
import { CartItem } from '../models/cartitem';
import { Navbar } from './navbar/navbar';
import { Router, RouterOutlet } from '@angular/router';
import { SharingData } from '../services/sharing-data';
import Swal from 'sweetalert2';

@Component({
  selector: 'cart-app',
  imports: [Catalog, Navbar, RouterOutlet],
  templateUrl: './cart-app.html',
})
export class CartApp implements OnInit {

  items: CartItem[] = [];

  total: number = 0;

  constructor(
    private router: Router,
    private sharingData: SharingData,
    private service: ProductService) { }

  ngOnInit(): void {
    this.items = JSON.parse(sessionStorage.getItem('cart') || '[]');
    this.calculateTotal();
    this.onDeleteCart();
    this.onAddCart();
  }

  onAddCart(): void {
    this.sharingData.productEventEmitter.subscribe(product => {
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
      this.router.navigate(['/cart'], { state: { items: this.items, total: this.total } });

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
          this.items = this.items.filter(item => item.product.id !== id);
          if (this.items.length === 0) {
            sessionStorage.removeItem('cart');
            //sessionStorage.clear(); //elimina todo incluso la sesion de usuario por eso no es recomendable
          }
          this.calculateTotal();
          this.saveSession();

          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/cart'], { state: { items: this.items, total: this.total } });
          });
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

calculateTotal(): void {
  this.total = this.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
}

saveSession(): void {
  sessionStorage.setItem('cart', JSON.stringify(this.items));
}

}
