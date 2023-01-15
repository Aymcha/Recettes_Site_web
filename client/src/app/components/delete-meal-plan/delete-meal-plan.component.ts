import { Component, OnInit } from '@angular/core';
import { PlanRepas } from 'src/app/interfaces/meal-plan';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-delete-meal-plan',
  templateUrl: './delete-meal-plan.component.html',
  styleUrls: ['./delete-meal-plan.component.css']
})
export class DeleteMealPlanComponent implements OnInit {
  mealPlans: PlanRepas[];
  displayedColumns: string[] = ['NumeroPlan', 'Categorie', 'Frequence', 'NombrePersonnes', 'Calories', 'Prix', 'Fournisseur', 'Actions'];

  constructor(public communicationService: CommunicationService) { }

  ngOnInit(): void {
    this.communicationService.getMealPlans().subscribe((mealPlans) => {
      this.mealPlans = mealPlans;
    });
  }

  deleteMealPlan(id: number): void {
    this.communicationService.deleteMealPlan(id).subscribe();
    window.location.reload();
  }

}
