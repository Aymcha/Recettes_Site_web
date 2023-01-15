import { Component, OnInit } from '@angular/core';
import { PlanRepas } from 'src/app/interfaces/meal-plan';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-meal-plan',
  templateUrl: './meal-plan.component.html',
  styleUrls: ['./meal-plan.component.css']
})
export class MealPlanComponent implements OnInit {
  mealPlans: PlanRepas[];
  displayedColumns: string[] = ['NumeroPlan', 'Categorie', 'Frequence', 'NombrePersonnes', 'Calories', 'Prix', 'Fournisseur'];

  constructor(private communicationService: CommunicationService) { }

  ngOnInit(): void {
    this.communicationService.getMealPlans().subscribe((mealPlans) => {
      this.mealPlans = mealPlans;
    })
  }
}
