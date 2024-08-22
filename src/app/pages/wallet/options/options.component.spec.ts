import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletOptionsComponent } from './options.component';

describe('OptionsComponent', () => {
  let component: WalletOptionsComponent;
  let fixture: ComponentFixture<WalletOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WalletOptionsComponent]
    });
    fixture = TestBed.createComponent(WalletOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
