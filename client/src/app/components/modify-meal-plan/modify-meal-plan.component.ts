import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlanRepas } from 'src/app/interfaces/meal-plan';
import { CommunicationService } from 'src/app/services/communication.service';
import { NewPopUpComponent } from '../new-pop-up/new-pop-up.component';

@Component({
  selector: 'app-modify-meal-plan',
  templateUrl: './modify-meal-plan.component.html',
  styleUrls: ['./modify-meal-plan.component.css']
})
export class ModifyMealPlanComponent implements OnInit {
  mealPlans: PlanRepas[];
  vendors: number[];
  displayedColumns: string[] = ['NumeroPlan', 'Categorie', 'Frequence', 'NombrePersonnes', 'Calories', 'Prix', 'Fournisseur', 'Actions'];

  constructor(private communicationService: CommunicationService, private modifyMealPlanDialog: MatDialog) { }

  ngOnInit(): void {
    this.communicationService.getMealPlans().subscribe((mealPlans) => {
      this.mealPlans = mealPlans;
    });

    this.communicationService.getAllVendors().subscribe((vendors: number[]) => {
      this.vendors=vendors
    });

  }

  openModifyDialog(mealPlan: PlanRepas): void {
    this.communicationService.mealPlanId.next(mealPlan.numeroplan);
    this.modifyMealPlanDialog
    .open(NewPopUpComponent, { disableClose: true ,data:{ mealPlan: mealPlan} })
    .afterClosed()
    .subscribe(() => {
    });
  }
}
