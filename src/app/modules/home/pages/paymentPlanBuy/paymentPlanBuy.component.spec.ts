import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPlanBuyComponent } from './paymentPlanBuy.component';

describe('PaymentPlanBuyComponent', () => {
  let component: PaymentPlanBuyComponent;
  let fixture: ComponentFixture<PaymentPlanBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentPlanBuyComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentPlanBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
