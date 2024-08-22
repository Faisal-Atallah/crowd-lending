import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletSaveWithUsDialogComponent } from './save-with-us.component';

describe('SaveWithUsComponent', () => {
  let component: WalletSaveWithUsDialogComponent;
  let fixture: ComponentFixture<WalletSaveWithUsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WalletSaveWithUsDialogComponent]
    });
    fixture = TestBed.createComponent(WalletSaveWithUsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
