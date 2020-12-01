import { TestBed } from '@angular/core/testing';
import { OrderReviewService } from './orderReview.service';

describe('OrderReviewService', () => {
  let service: OrderReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
