import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./modules/app-routing.module";
import { AppComponent } from "./app.component";
import { CommunicationService } from "./services/communication.service";
import { AppMaterialModule } from './modules/material.module';
import { MealPlanComponent } from './components/meal-plan/meal-plan.component';
import { AddMealPlanComponent } from './components/add-meal-plan/add-meal-plan.component';
import { NewPopUpComponent } from './components/new-pop-up/new-pop-up.component';
import { ModifyMealPlanComponent } from './components/modify-meal-plan/modify-meal-plan.component';
import { DeleteMealPlanComponent } from './components/delete-meal-plan/delete-meal-plan.component';

@NgModule({
  declarations: [
    AppComponent,
    MealPlanComponent,
    AddMealPlanComponent,
    NewPopUpComponent,
    ModifyMealPlanComponent,
    DeleteMealPlanComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AppMaterialModule
  ],
  providers: [CommunicationService],
  entryComponents: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
