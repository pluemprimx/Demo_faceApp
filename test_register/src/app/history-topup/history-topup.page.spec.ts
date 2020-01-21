import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryTopupPage } from './history-topup.page';

describe('HistoryTopupPage', () => {
  let component: HistoryTopupPage;
  let fixture: ComponentFixture<HistoryTopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryTopupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryTopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
