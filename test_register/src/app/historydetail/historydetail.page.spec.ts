import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorydetailPage } from './historydetail.page';

describe('HistorydetailPage', () => {
  let component: HistorydetailPage;
  let fixture: ComponentFixture<HistorydetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorydetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorydetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
