import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotelPageComponent } from './motel-page.component';

describe('MotelPageComponent', () => {
  let component: MotelPageComponent;
  let fixture: ComponentFixture<MotelPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotelPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotelPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
