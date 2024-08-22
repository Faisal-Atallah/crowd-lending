import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioChartComponent } from './chart.component';

describe('PortofolioChartComponent', () => {
  let component: PortfolioChartComponent;
  let fixture: ComponentFixture<PortfolioChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PortfolioChartComponent]
    });
    fixture = TestBed.createComponent(PortfolioChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
