import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleMapPage } from './simple-map.page';

describe('SimpleMapPage', () => {
  let component: SimpleMapPage;
  let fixture: ComponentFixture<SimpleMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleMapPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
