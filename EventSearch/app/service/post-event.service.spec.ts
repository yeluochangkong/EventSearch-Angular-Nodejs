import { TestBed } from '@angular/core/testing';

import { PostEventService } from './post-event.service';

describe('PostEventService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostEventService = TestBed.get(PostEventService);
    expect(service).toBeTruthy();
  });
});
