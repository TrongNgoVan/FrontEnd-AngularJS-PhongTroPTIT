import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCriteriaComponent } from './create-criteria.component';

describe('CreateCriteriaComponent', () => {
  let component: CreateCriteriaComponent;
  let fixture: ComponentFixture<CreateCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
