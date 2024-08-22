import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsLanguageComponent } from './language.component';

describe('SettingsLanguageComponent', () => {
  let component: SettingsLanguageComponent;
  let fixture: ComponentFixture<SettingsLanguageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SettingsLanguageComponent]
    });
    fixture = TestBed.createComponent(SettingsLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
