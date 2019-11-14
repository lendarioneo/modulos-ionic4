import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMarkerPage } from './custom-marker.page';

describe('CustomMarkerPage', () => {
  let component: CustomMarkerPage;
  let fixture: ComponentFixture<CustomMarkerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomMarkerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomMarkerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
