import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestFormComponent } from './form.component';

describe('InvestFormComponent', () => {
  let component: InvestFormComponent;
  let fixture: ComponentFixture<InvestFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InvestFormComponent]
    });
    fixture = TestBed.createComponent(InvestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
