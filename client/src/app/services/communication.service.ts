import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, Observable, Subject, BehaviorSubject } from "rxjs";
import { catchError } from "rxjs/operators";
import { PlanRepas } from "../interfaces/meal-plan";

@Injectable()
export class CommunicationService {
  private readonly BASE_URL: string = "http://localhost:3000/database";
  public constructor(private http: HttpClient) {}
  public mealPlanId: BehaviorSubject<number>=new BehaviorSubject(10);
  private _listeners: any = new Subject<any>();

  listen(): Observable<any> {
    return this._listeners.asObservable();
  }

  filter(filterBy: string): void {
    this._listeners.next(filterBy);
  }

  getMealPlans(): Observable<PlanRepas[]> {
    return this.http.get<PlanRepas[]>(`${this.BASE_URL}/mealPlans`).pipe(catchError(this.handleError<PlanRepas[]>('mealPlans')));
  }

  getAllVendors(): Observable<number[]> {
    return this.http.get<number[]>(`${this.BASE_URL}/allVendors`).pipe(catchError(this.handleError<number[]>('last-vendor')));
  }

  addNewPlan(mealPlan: PlanRepas): Observable<void> {
    window.location.reload();
    return this.http.post<void>(`${this.BASE_URL}/mealPlan`, mealPlan ).pipe(catchError(this.handleError<void>('mealPlan')));
  }

  modifyMealPlan(mealPlan: PlanRepas): Observable<void> {
    window.location.reload();
    return this.http.put<void>(`${this.BASE_URL}/mealPlan`, mealPlan ).pipe(catchError(this.handleError<void>('mealPlan')));
  }

  deleteMealPlan(mealPlanID: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/mealPlan/${JSON.stringify(mealPlanID)}`).pipe(catchError(this.handleError<void>('mealPlan')));
  }

  private handleError<T>(
    request: string,
    result?: T
  ): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }
}
