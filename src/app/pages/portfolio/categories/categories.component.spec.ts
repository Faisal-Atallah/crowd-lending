import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioCategoriesComponent } from './categories.component';

describe('PortofolioCategoriesComponent', () => {
  let component: PortfolioCategoriesComponent;
  let fixture: ComponentFixture<PortfolioCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PortfolioCategoriesComponent]
    });
    fixture = TestBed.createComponent(PortfolioCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
