import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem, Product } from '../../types';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  @Input({ required: true }) items: CartItem[] = [];
  @Input({ required: true }) subtotal = 0;
  @Input({ required: true }) taxRate = 0;
  @Input({ required: true }) tax = 0;
  @Input({ required: true }) total = 0;

  @Output() readonly increase = new EventEmitter<Product>();
  @Output() readonly decrease = new EventEmitter<Product>();
  @Output() readonly remove = new EventEmitter<Product>();

  protected onIncrease(product: Product): void {
    this.increase.emit(product);
  }

  protected onDecrease(product: Product): void {
    this.decrease.emit(product);
  }

  protected onRemove(product: Product): void {
    this.remove.emit(product);
  }
}
