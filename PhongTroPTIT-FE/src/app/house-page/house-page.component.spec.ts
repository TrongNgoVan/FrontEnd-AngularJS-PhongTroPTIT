import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HousePageComponent } from './house-page.component';

describe('HousePageComponent', () => {
  let component: HousePageComponent;
  let fixture: ComponentFixture<HousePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HousePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
