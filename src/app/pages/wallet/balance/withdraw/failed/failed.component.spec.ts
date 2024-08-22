import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawFailedDialogComponent } from './failed.component';

describe('FailedComponent', () => {
  let component: WithdrawFailedDialogComponent;
  let fixture: ComponentFixture<WithdrawFailedDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WithdrawFailedDialogComponent]
    });
    fixture = TestBed.createComponent(WithdrawFailedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
