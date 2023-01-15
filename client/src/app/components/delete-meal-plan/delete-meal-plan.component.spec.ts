import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMealPlanComponent } from './delete-meal-plan.component';

describe('DeleteMealPlanComponent', () => {
  let component: DeleteMealPlanComponent;
  let fixture: ComponentFixture<DeleteMealPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMealPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteMealPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
