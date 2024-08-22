import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentSectorDetailsComponent } from './details.component';

describe('DetailsComponent', () => {
  let component: InvestmentSectorDetailsComponent;
  let fixture: ComponentFixture<InvestmentSectorDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InvestmentSectorDetailsComponent]
    });
    fixture = TestBed.createComponent(InvestmentSectorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
