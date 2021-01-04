import { TestBed } from '@angular/core/testing';

import { DonationListService } from './donationList.service';

describe('DonationListService', () => {
  let service: DonationListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonationListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
