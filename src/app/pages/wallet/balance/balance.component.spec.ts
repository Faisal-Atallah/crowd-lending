import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletBalanceComponent } from './balance.component';

describe('BalanceComponent', () => {
  let component: WalletBalanceComponent;
  let fixture: ComponentFixture<WalletBalanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WalletBalanceComponent]
    });
    fixture = TestBed.createComponent(WalletBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
