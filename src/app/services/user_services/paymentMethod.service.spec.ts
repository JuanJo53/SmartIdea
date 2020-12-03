import { TestBed } from '@angular/core/testing';
import {PaymentMethodComponent} from '../../modules/home/pages/paymentMethod/paymentMethod.component';
import {PaymentMethodService} from './paymentMethod.service';

describe('PaymentMethodComponent', () => {
  let service: PaymentMethodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentMethodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
