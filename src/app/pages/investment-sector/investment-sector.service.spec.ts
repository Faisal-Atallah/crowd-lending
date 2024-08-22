import { TestBed } from '@angular/core/testing';

import { InvestmentSectorService } from './investment-sector.service';

describe('InvestmentSectorService', () => {
  let service: InvestmentSectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentSectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
