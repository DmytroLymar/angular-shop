import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Cart } from './components/cart/cart';
import { ProductCard } from './components/product-card/product-card';
import { CartService } from './services/cart.service';
import { Product } from './types';

@Component({
  selector: 'app-root',
  imports: [CommonModule, Cart, ProductCard],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Simple Shop');

  private readonly cartService = inject(CartService);

  protected readonly products = this.cartService.products;
  protected readonly cartItems = this.cartService.cartItems;
  protected readonly subtotal = this.cartService.subtotal;
  protected readonly taxRate = this.cartService.taxRate;
  protected readonly tax = this.cartService.tax;
  protected readonly total = this.cartService.total;

  protected addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  protected increase(product: Product): void {
    this.cartService.increase(product);
  }

  protected decrease(product: Product): void {
    this.cartService.decrease(product);
  }

  protected remove(product: Product): void {
    this.cartService.remove(product);
  }

  protected clearCart(): void {
    this.cartService.clearCart();
  }
}
