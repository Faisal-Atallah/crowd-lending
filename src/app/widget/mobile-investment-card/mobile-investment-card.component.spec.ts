import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileInvestmentCardComponent } from './mobile-investment-card.component';

describe('MobileInvestmentCardComponent', () => {
  let component: MobileInvestmentCardComponent;
  let fixture: ComponentFixture<MobileInvestmentCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MobileInvestmentCardComponent]
    });
    fixture = TestBed.createComponent(MobileInvestmentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
