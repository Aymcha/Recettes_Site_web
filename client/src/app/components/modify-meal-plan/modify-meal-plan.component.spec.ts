import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyMealPlanComponent } from './modify-meal-plan.component';

describe('ModifyMealPlanComponent', () => {
  let component: ModifyMealPlanComponent;
  let fixture: ComponentFixture<ModifyMealPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyMealPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyMealPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
