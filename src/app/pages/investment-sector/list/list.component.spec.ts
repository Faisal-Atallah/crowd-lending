import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentSectorListComponent } from './list.component';

describe('InvestmentSectorListComponent', () => {
  let component: InvestmentSectorListComponent;
  let fixture: ComponentFixture<InvestmentSectorListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InvestmentSectorListComponent]
    });
    fixture = TestBed.createComponent(InvestmentSectorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
