import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsListTableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TransactionsListTableComponent;
  let fixture: ComponentFixture<TransactionsListTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TransactionsListTableComponent]
    });
    fixture = TestBed.createComponent(TransactionsListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
