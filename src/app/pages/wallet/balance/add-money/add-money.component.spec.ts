import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletAddMoneyDialogComponent } from './add-money.component';

describe('AddMoneyComponent', () => {
  let component: WalletAddMoneyDialogComponent;
  let fixture: ComponentFixture<WalletAddMoneyDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WalletAddMoneyDialogComponent]
    });
    fixture = TestBed.createComponent(WalletAddMoneyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
