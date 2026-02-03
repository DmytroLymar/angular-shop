import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartItem, Product } from '../../types';
import { Cart } from './cart';

describe('Cart', () => {
  let component: Cart;
  let fixture: ComponentFixture<Cart>;
  let products: Product[];
  let items: CartItem[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cart],
    }).compileComponents();

    fixture = TestBed.createComponent(Cart);
    component = fixture.componentInstance;
    products = [
      {
        id: 'tea',
        name: 'Herbal Tea',
        description: 'Caffeine-free blend.',
        price: 6.5,
      },
      {
        id: 'coffee',
        name: 'Dark Roast Coffee',
        description: 'Bold and smooth.',
        price: 9.25,
      },
    ];
    items = [
      {
        product: products[0],
        quantity: 2,
        lineTotal: 13,
      },
      {
        product: products[1],
        quantity: 1,
        lineTotal: 9.25,
      },
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render empty state when there are no items', async () => {
    component.items = [];
    component.subtotal = 0;
    component.taxRate = 0;
    component.tax = 0;
    component.total = 0;

    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;

    expect(element.querySelector('.empty')?.textContent).toContain('Your cart is empty');
    expect(element.querySelector('.cart-items')).toBeNull();
    expect(element.querySelector('.summary')).toBeNull();
    expect(element.querySelector('.cart-header p')?.textContent).toContain('0 items');
  });

  it('should render cart items and summary when items are provided', async () => {
    component.items = items;
    component.subtotal = 22.25;
    component.taxRate = 0.075;
    component.tax = 1.67;
    component.total = 23.92;

    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    const rows = element.querySelectorAll('.cart-row');

    expect(rows.length).toBe(2);
    expect(rows[0].querySelector('h3')?.textContent).toContain('Herbal Tea');
    expect(rows[0].querySelector('.line-total')?.textContent).toContain('$13.00');
    expect(rows[1].querySelector('h3')?.textContent).toContain('Dark Roast Coffee');
    expect(rows[1].querySelector('.line-total')?.textContent).toContain('$9.25');

    expect(element.querySelector('.summary')?.textContent).toContain('Subtotal');
    expect(element.querySelector('.summary')?.textContent).toContain('$22.25');
    expect(element.querySelector('.summary')?.textContent).toContain('7.5%');
    expect(element.querySelector('.summary')?.textContent).toContain('$1.67');
    expect(element.querySelector('.summary')?.textContent).toContain('$23.92');
    expect(element.querySelector('.cart-header p')?.textContent).toContain('2 items');
  });

  it('should emit increase, decrease, and remove events from buttons', async () => {
    component.items = items;
    component.subtotal = 22.25;
    component.taxRate = 0.075;
    component.tax = 1.67;
    component.total = 23.92;

    fixture.detectChanges();

    const increaseSpy = vi.spyOn(component.increase, 'emit');
    const decreaseSpy = vi.spyOn(component.decrease, 'emit');
    const removeSpy = vi.spyOn(component.remove, 'emit');

    const decreaseButtons = fixture.debugElement.queryAll(
      By.css('button[aria-label="Decrease quantity"]'),
    );
    const increaseButtons = fixture.debugElement.queryAll(
      By.css('button[aria-label="Increase quantity"]'),
    );
    const removeButtons = fixture.debugElement.queryAll(By.css('button.link-button'));

    decreaseButtons[0].triggerEventHandler('click');
    increaseButtons[0].triggerEventHandler('click');
    removeButtons[0].triggerEventHandler('click');

    expect(decreaseSpy).toHaveBeenCalledWith(products[0]);
    expect(increaseSpy).toHaveBeenCalledWith(products[0]);
    expect(removeSpy).toHaveBeenCalledWith(products[0]);
  });
});
