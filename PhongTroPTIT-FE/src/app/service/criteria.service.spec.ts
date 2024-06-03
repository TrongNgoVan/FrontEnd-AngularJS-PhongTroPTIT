import { TestBed } from '@angular/core/testing';

import { CriteriaService } from './criteria.service';

describe('CriteriaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CriteriaService = TestBed.get(CriteriaService);
    expect(service).toBeTruthy();
  });
});
