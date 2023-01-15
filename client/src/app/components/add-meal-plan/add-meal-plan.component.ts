import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlanRepas } from 'src/app/interfaces/meal-plan';
import { CommunicationService } from 'src/app/services/communication.service';
import { NewPopUpComponent } from '../new-pop-up/new-pop-up.component';

@Component({
  selector: 'app-add-meal-plan',
  templateUrl: './add-meal-plan.component.html',
  styleUrls: ['./add-meal-plan.component.css']
})
export class AddMealPlanComponent implements OnInit {
  mealPlans: PlanRepas[];
  vendors: number[];
  displayedColumns: string[] = ['NumeroPlan', 'Categorie', 'Frequence', 'NombrePersonnes', 'Calories', 'Prix', 'Fournisseur'];

  constructor(private communicationService: CommunicationService, public addMealPlanDialog: MatDialog) { }

  ngOnInit(): void {
    this.communicationService.getMealPlans().subscribe((mealPlans) => {
      this.mealPlans = mealPlans;
    });

    this.communicationService.getAllVendors().subscribe((vendors: number[]) => {
      this.vendors = vendors;
    });

  }

  openAddDialog(): void {
    this.addMealPlanDialog
    .open(NewPopUpComponent, { disableClose: true , data:{} })
    .afterClosed()
    .subscribe(() => {});
  }

}
