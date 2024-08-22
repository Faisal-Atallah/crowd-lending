import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestDialogComponent } from './dialog.component';

describe('InvestDialogComponent', () => {
  let component: InvestDialogComponent;
  let fixture: ComponentFixture<InvestDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestDialogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InvestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
