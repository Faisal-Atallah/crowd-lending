import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestDialogCardComponent } from './card.component';

describe('CardComponent', () => {
  let component: InvestDialogCardComponent;
  let fixture: ComponentFixture<InvestDialogCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestDialogCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvestDialogCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
