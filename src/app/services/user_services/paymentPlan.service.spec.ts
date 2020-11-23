import { TestBed } from '@angular/core/testing';

import { PaymentPlanService } from './paymentPlan.service';

describe('PaymentPlanService', () => {
  let service: PaymentPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
