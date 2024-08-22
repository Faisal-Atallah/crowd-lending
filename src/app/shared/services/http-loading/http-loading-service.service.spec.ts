import { TestBed } from '@angular/core/testing';

import { HttpLoadingService } from './http-loading-service.service';

describe('LoadingServiceService', () => {
  let service: HttpLoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpLoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
