import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyLayoutComponent } from './empty.component';

describe('EmptyLayoutComponent', () => {
  let component: EmptyLayoutComponent;
  let fixture: ComponentFixture<EmptyLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EmptyLayoutComponent]
    });
    fixture = TestBed.createComponent(EmptyLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
