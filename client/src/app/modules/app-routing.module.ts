import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "../app.component";
import { AddMealPlanComponent } from "../components/add-meal-plan/add-meal-plan.component";
import { DeleteMealPlanComponent } from "../components/delete-meal-plan/delete-meal-plan.component";
import { MealPlanComponent } from "../components/meal-plan/meal-plan.component";
import { ModifyMealPlanComponent } from "../components/modify-meal-plan/modify-meal-plan.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: 'plansRepas', component: MealPlanComponent},
  { path: 'add-meal-plan', component: AddMealPlanComponent},
  { path: 'modify', component: ModifyMealPlanComponent},
  { path: 'delete', component: DeleteMealPlanComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
