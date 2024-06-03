import { TestBed } from '@angular/core/testing';

import { ImageHandlerService } from './image-handler.service';

describe('ImageHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImageHandlerService = TestBed.get(ImageHandlerService);
    expect(service).toBeTruthy();
  });
});
