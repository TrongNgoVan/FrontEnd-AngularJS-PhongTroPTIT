import { TestBed } from '@angular/core/testing';

import { GeocodingApiServiceService } from './geocoding-api-service.service';

describe('GeocodingApiServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeocodingApiServiceService = TestBed.get(GeocodingApiServiceService);
    expect(service).toBeTruthy();
  });
});
