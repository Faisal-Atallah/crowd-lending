import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentSectorComponent } from './investment-sector.component';

describe('InvestmentSectorComponent', () => {
  let component: InvestmentSectorComponent;
  let fixture: ComponentFixture<InvestmentSectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InvestmentSectorComponent]
    });
    fixture = TestBed.createComponent(InvestmentSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
