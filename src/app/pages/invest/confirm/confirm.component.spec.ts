import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestConfirmComponent } from './confirm.component';

describe('InvestConfirmComponent', () => {
  let component: InvestConfirmComponent;
  let fixture: ComponentFixture<InvestConfirmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InvestConfirmComponent]
    });
    fixture = TestBed.createComponent(InvestConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
