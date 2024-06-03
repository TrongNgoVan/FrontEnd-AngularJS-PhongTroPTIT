import { TestBed } from '@angular/core/testing';

import { DistrictService } from './district.service';

describe('DistrictService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DistrictService = TestBed.get(DistrictService);
    expect(service).toBeTruthy();
  });
});
