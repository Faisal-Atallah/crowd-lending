import { TestBed } from '@angular/core/testing';

import { InvestmentDetailsService } from './investment-details.service';

describe('InvestmentDetailsService', () => {
  let service: InvestmentDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
