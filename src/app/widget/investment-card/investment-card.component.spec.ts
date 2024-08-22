import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentCardComponent } from './investment-card.component';

describe('InvestmentCardComponent', () => {
  let component: InvestmentCardComponent;
  let fixture: ComponentFixture<InvestmentCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InvestmentCardComponent]
    });
    fixture = TestBed.createComponent(InvestmentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
