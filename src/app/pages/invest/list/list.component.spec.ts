import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestListComponent } from './list.component';

describe('InvestListComponent', () => {
  let component: InvestListComponent;
  let fixture: ComponentFixture<InvestListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InvestListComponent]
    });
    fixture = TestBed.createComponent(InvestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
