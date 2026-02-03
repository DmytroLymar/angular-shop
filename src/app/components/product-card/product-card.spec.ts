import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Product } from '../../types';

import { ProductCard } from './product-card';

describe('ProductCard', () => {
  let component: ProductCard;
  let fixture: ComponentFixture<ProductCard>;
  let product: Product;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCard);
    component = fixture.componentInstance;
    product = {
      id: 'tea',
      name: 'Herbal Tea',
      description: 'Caffeine-free blend.',
      price: 6.5,
    };
    component.product = product;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should renders the product details', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(element.querySelector('h2')?.textContent).toContain(product.name);
    expect(element.querySelector('p')?.textContent).toContain(product.description);
    expect(element.querySelector('.price')?.textContent).toContain('6.50');
  });

  it('should emits when add button is clicked', () => {
    const addSpy = vi.spyOn(component.add, 'emit');

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click');

    expect(addSpy).toHaveBeenCalledWith(product);
  });
});
