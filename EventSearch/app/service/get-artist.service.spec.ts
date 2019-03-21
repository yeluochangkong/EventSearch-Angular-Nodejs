import { TestBed } from '@angular/core/testing';

import { GetArtistService } from './get-artist.service';

describe('GetArtistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetArtistService = TestBed.get(GetArtistService);
    expect(service).toBeTruthy();
  });
});
