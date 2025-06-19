import { Component, Input } from '@angular/core';
import { CartItem } from '../../models/cartitem';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'navbar',
  imports: [RouterModule],
  templateUrl: './navbar.html',
})
export class Navbar {

  @Input() items: CartItem[] = [];
 
}
