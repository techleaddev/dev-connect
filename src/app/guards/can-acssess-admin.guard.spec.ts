import { TestBed } from '@angular/core/testing';

import { CanAcssessAdminGuard } from './can-acssess-admin.guard';

describe('CanAcssessAdminGuard', () => {
  let guard: CanAcssessAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanAcssessAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
