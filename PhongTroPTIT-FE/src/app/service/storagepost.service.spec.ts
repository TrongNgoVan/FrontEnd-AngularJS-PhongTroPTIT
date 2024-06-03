import { TestBed } from '@angular/core/testing';

import { StoragepostService } from './storagepost.service';

describe('StoragepostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoragepostService = TestBed.get(StoragepostService);
    expect(service).toBeTruthy();
  });
});
