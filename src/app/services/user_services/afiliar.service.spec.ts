import { TestBed } from '@angular/core/testing';

import { AfiliarService } from './afiliar.service';

describe('AfiliarService', () => {
  let service: AfiliarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AfiliarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
