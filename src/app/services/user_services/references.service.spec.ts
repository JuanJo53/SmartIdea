import { TestBed } from '@angular/core/testing';

import { ReferencesService } from './references.service';

describe('ReferencesService', () => {
  let service: ReferencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReferencesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
