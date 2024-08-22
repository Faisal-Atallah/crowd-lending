import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioItemsComponent } from './items.component';

describe('PortfolioItemsComponent', () => {
  let component: PortfolioItemsComponent;
  let fixture: ComponentFixture<PortfolioItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PortfolioItemsComponent]
    });
    fixture = TestBed.createComponent(PortfolioItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
