import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMainContainerComponent } from './product-main-container.component';

describe('ProductMainContainerComponent', () => {
  let component: ProductMainContainerComponent;
  let fixture: ComponentFixture<ProductMainContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductMainContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
