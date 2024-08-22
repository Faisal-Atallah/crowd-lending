import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAddMoneyDialogComponent } from './confirm.component';

describe('ConfirmComponent', () => {
  let component: ConfirmAddMoneyDialogComponent;
  let fixture: ComponentFixture<ConfirmAddMoneyDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConfirmAddMoneyDialogComponent]
    });
    fixture = TestBed.createComponent(ConfirmAddMoneyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
