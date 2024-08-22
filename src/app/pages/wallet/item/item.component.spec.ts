import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletItemComponent } from './item.component';

describe('ItemComponent', () => {
  let component: WalletItemComponent;
  let fixture: ComponentFixture<WalletItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WalletItemComponent]
    });
    fixture = TestBed.createComponent(WalletItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
