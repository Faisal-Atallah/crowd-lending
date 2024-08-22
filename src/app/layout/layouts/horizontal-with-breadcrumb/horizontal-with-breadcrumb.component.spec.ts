import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalWithBreadcrumbComponent } from './horizontal-with-breadcrumb.component';

describe('HorizontalWithBreadcrumbComponent', () => {
  let component: HorizontalWithBreadcrumbComponent;
  let fixture: ComponentFixture<HorizontalWithBreadcrumbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HorizontalWithBreadcrumbComponent]
    });
    fixture = TestBed.createComponent(HorizontalWithBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
