import { TestBed } from '@angular/core/testing';
import { PRODUCTS } from '../data/products';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should starts with an empty cart', () => {
    expect(service.cartItems().length).toBe(0);
    expect(service.subtotal()).toBe(0);
    expect(service.tax()).toBe(0);
    expect(service.total()).toBe(0);
  });

  it('should adds items and updates totals', () => {
    const product = PRODUCTS[0];

    service.addToCart(product);

    expect(service.cartItems().length).toBe(1);
    expect(service.cartItems()[0].quantity).toBe(1);
    expect(service.subtotal()).toBeCloseTo(product.price);
    expect(service.total()).toBeCloseTo(service.subtotal() + service.tax());
  });

  it('should increase increments quantity', () => {
    const product = PRODUCTS[1];

    service.addToCart(product);
    service.increase(product);

    const item = service.cartItems()[0];
    expect(item.quantity).toBe(2);
    expect(item.lineTotal).toBeCloseTo(product.price * 2);
  });

  it('should decrease reduces quantity and removes when zero', () => {
    const product = PRODUCTS[2];

    service.addToCart(product);
    service.decrease(product);

    expect(service.cartItems().length).toBe(0);
  });

  it('should remove deletes an item from the cart', () => {
    const product = PRODUCTS[3];

    service.addToCart(product);
    service.remove(product);

    expect(service.cartItems().length).toBe(0);
  });

  it('should empties the cart and resets totals', () => {
    service.addToCart(PRODUCTS[0]);
    service.addToCart(PRODUCTS[1]);

    service.clearCart();

    expect(service.cartItems().length).toBe(0);
    expect(service.subtotal()).toBe(0);
    expect(service.tax()).toBe(0);
    expect(service.total()).toBe(0);
  });
});
