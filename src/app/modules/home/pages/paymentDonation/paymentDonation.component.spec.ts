import { ComponentFixture, TestBed } from '@angular/core/testing';
import {PaymentDonationComponent} from './paymentDonation.component';

describe('PaymentDonationComponent', () => {
  let component: PaymentDonationComponent;
  let fixture: ComponentFixture<PaymentDonationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentDonationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
