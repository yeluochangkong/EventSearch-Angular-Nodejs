import { TestBed } from '@angular/core/testing';

import { GetEventDetailService } from './get-event-detail.service';

describe('GetEventDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetEventDetailService = TestBed.get(GetEventDetailService);
    expect(service).toBeTruthy();
  });
});
