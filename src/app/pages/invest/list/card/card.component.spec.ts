import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestListCardComponent } from './card.component';

describe('CardComponent', () => {
  let component: InvestListCardComponent;
  let fixture: ComponentFixture<InvestListCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InvestListCardComponent]
    });
    fixture = TestBed.createComponent(InvestListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
