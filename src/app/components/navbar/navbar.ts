import { Component, Input } from '@angular/core';
import { CartItem } from '../../models/cartitem';
import { RouterModule } from '@angular/router';
import { Product } from '../../models/product';

@Component({
  selector: 'navbar',
  imports: [RouterModule],
  templateUrl: './navbar.html',
})
export class Navbar {

  @Input() items: CartItem[] = [];

  @Input() total: number = 0;

  @Input() products: Product[] = [];
 
}
