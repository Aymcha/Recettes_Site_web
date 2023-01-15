import { Component, Inject} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlanRepas } from 'src/app/interfaces/meal-plan';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-new-pop-up',
  templateUrl: './new-pop-up.component.html',
  styleUrls: ['./new-pop-up.component.css']
})
export class NewPopUpComponent {
  category: string = '';
  frequency: number;
  people: number;
  calories: number;
  price: number;
  vendor: number;
  vendorId:number;
  nbrMealPlans: number;
  vendors:number[];


  formGroup = new FormGroup ({
    vendorControl: new FormControl('', [Validators.required]),
    categoryControl: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    frequencyControl:  new FormControl('',[Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]),
    nbrPeopleControl: new FormControl('',[Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]),
    nbrCaloriesControl:  new FormControl('',[Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]),
    priceControl: new FormControl('',[Validators.required, Validators.min(0.01), Validators.pattern("^[0-9]+(.[0-9]{1,2})?$")]),
  });


  constructor(public dialogRef: MatDialogRef<NewPopUpComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private communicationService: CommunicationService) {} 

  ngOnInit(): void {
    if (this.data.mealPlan){
      this.category = this.data.mealPlan.categorie;
      this.frequency = this.data.mealPlan.frequence;
      this.people = this.data.mealPlan.nbrpersonnes;
      this.calories = this.data.mealPlan.nbrcalories;
      this.price = this.data.mealPlan.prix;
      this.vendor = this.data.mealPlan.numerofournisseur;
    }
    this.communicationService.getAllVendors().subscribe((vendors: number[]) => {
      this.vendors=vendors;
    });
    this.communicationService.mealPlanId.asObservable().subscribe((vendor: number) => {
      this.vendorId=vendor;
    });
  }

  addMealPlan() : void {
    console.log('hahahahah')
    const newMealPlan: PlanRepas = {
      numeroplan: 0,
      categorie: this.category,
      frequence: this.frequency,
      nbrpersonnes: this.people,
      nbrcalories: this.calories,
      prix: this.price,
      numerofournisseur: this.vendor,
    }
    
    
    this.communicationService.addNewPlan(newMealPlan).subscribe();
    this.dialogRef.close();
  }

  
  modifyMealPlan() : void {
    const newMealPlan: PlanRepas = {
      numeroplan: this.vendorId,
      categorie: this.category,
      frequence: this.frequency,
      nbrpersonnes: this.people,
      nbrcalories: this.calories,
      prix: this.price,
      numerofournisseur: this.vendor,
    }
    console.log(newMealPlan)
    
    this.communicationService.modifyMealPlan(newMealPlan).subscribe();
    this.dialogRef.close();
  }

}
