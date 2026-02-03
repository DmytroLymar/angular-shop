import { computed, Injectable, signal } from '@angular/core';
import { PRODUCTS } from '../data/products';
import { CartItem, Product } from '../types';

@Injectable({ providedIn: 'root' })
export class CartService {
  readonly products = signal<Product[]>(PRODUCTS);
  readonly cart = signal<Record<string, number>>({});

  readonly cartItems = computed<CartItem[]>(() => {
    const items = this.products();
    const cartSnapshot = this.cart();

    return items
      .filter((item) => cartSnapshot[item.id] && cartSnapshot[item.id] > 0)
      .map((item) => {
        const quantity = cartSnapshot[item.id];
        const lineTotal = quantity * item.price;
        return { product: item, quantity, lineTotal };
      });
  });

  readonly subtotal = computed(() => {
    return this.cartItems().reduce((sum, item) => sum + item.lineTotal, 0);
  });

  readonly taxRate = signal(0.0825);
  readonly tax = computed(() => this.subtotal() * this.taxRate());
  readonly total = computed(() => this.subtotal() + this.tax());

  addToCart(product: Product): void {
    const current = this.cart();
    const nextQuantity = (current[product.id] ?? 0) + 1;
    this.cart.set({ ...current, [product.id]: nextQuantity });
  }

  increase(product: Product): void {
    this.addToCart(product);
  }

  decrease(product: Product): void {
    const current = this.cart();
    const existing = current[product.id] ?? 0;
    const nextQuantity = Math.max(existing - 1, 0);
    const next = { ...current };

    if (nextQuantity === 0) {
      delete next[product.id];
    } else {
      next[product.id] = nextQuantity;
    }

    this.cart.set(next);
  }

  remove(product: Product): void {
    const current = this.cart();
    const next = { ...current };
    delete next[product.id];
    this.cart.set(next);
  }

  clearCart(): void {
    this.cart.set({});
  }
}
