import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMealPlanComponent } from './add-meal-plan.component';

describe('AddMealPlanComponent', () => {
  let component: AddMealPlanComponent;
  let fixture: ComponentFixture<AddMealPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMealPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMealPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
