import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletWithdrawDialogComponent } from './withdraw.component';

describe('WithdrawComponent', () => {
  let component: WalletWithdrawDialogComponent;
  let fixture: ComponentFixture<WalletWithdrawDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WalletWithdrawDialogComponent]
    });
    fixture = TestBed.createComponent(WalletWithdrawDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
