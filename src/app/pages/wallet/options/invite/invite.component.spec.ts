import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletInviteDialogComponent } from './invite.component';

describe('InviteComponent', () => {
  let component: WalletInviteDialogComponent;
  let fixture: ComponentFixture<WalletInviteDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WalletInviteDialogComponent]
    });
    fixture = TestBed.createComponent(WalletInviteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
