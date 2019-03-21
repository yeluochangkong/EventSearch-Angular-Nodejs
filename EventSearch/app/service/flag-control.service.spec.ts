import { TestBed } from '@angular/core/testing';

import { FlagControlService } from './flag-control.service';

describe('FlagControlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlagControlService = TestBed.get(FlagControlService);
    expect(service).toBeTruthy();
  });
});
