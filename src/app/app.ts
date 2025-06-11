import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartApp } from './components/cart-app';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, CartApp],
  templateUrl: './app.html',
})
export class App {
  protected title = 'cart-app-angular';
}
