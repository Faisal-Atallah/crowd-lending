import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalLayoutComponent } from './horizontal.component';

describe('HorizontalComponent', () => {
  let component: HorizontalLayoutComponent;
  let fixture: ComponentFixture<HorizontalLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HorizontalLayoutComponent]
    });
    fixture = TestBed.createComponent(HorizontalLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
