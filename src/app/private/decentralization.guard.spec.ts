import { TestBed } from '@angular/core/testing';

import { DecentralizationGuard } from './decentralization.guard';

describe('DecentralizationGuard', () => {
  let guard: DecentralizationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DecentralizationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
