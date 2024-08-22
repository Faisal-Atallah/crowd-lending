import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioBalanceComponent } from './balance.component';

describe('PortofolioBalanceComponent', () => {
  let component: PortfolioBalanceComponent;
  let fixture: ComponentFixture<PortfolioBalanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PortfolioBalanceComponent]
    });
    fixture = TestBed.createComponent(PortfolioBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
