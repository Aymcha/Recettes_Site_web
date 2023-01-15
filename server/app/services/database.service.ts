import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { PlanRepas } from "../interfaces/meal-plan";

@injectable()
export class DatabaseService {
  public connectionConfig: pg.ConnectionConfig = {
    user: "postgres",
    database: "TP4_Livraison",
    password: "20012000",
    port: 5432,          // Attention ! Peut aussi être 5433 pour certains utilisateurs
    host: "127.0.0.1",
    keepAlive: true
  };

  public pool: pg.Pool = new pg.Pool(this.connectionConfig);


  public async getMealPlans(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const result = await client.query('SELECT * FROM planrepas ORDER BY numeroplan ;');
    client.release();
    return result;
  }

  
  public async getAllVendors(): Promise<number[]> {
    const client = await this.pool.connect();
    const result = await client.query('SELECT numerofournisseur FROM fournisseur;');
    client.release();
    let vendors:number[]=[]
    for (const vendorId of result.rows ) vendors.push(vendorId.numerofournisseur)
    return vendors;
  }

  public async addMealPlan(mealPlan: PlanRepas): Promise<void> {
    const client = await this.pool.connect();

    const values: (string | number)[] = [
      mealPlan.categorie,
      mealPlan.frequence,
      mealPlan.nbrpersonnes,
      mealPlan.nbrcalories,
      mealPlan.prix,
      mealPlan.numerofournisseur,
    ];

    const queryText: string = `INSERT INTO planrepas (categorie, frequence, nbrpersonnes, nbrcalories, prix, numerofournisseur) VALUES($1, $2, $3, $4, $5, $6);`;
    await client.query(queryText, values);
    client.release()
    return;
  }


  public async updateMealPlan(mealPlan: PlanRepas): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    
    const values: (string | number)[] = [
      mealPlan.numeroplan,
      mealPlan.categorie,
      mealPlan.frequence,
      mealPlan.nbrpersonnes,
      mealPlan.nbrcalories,
      mealPlan.prix,
      mealPlan.numerofournisseur,
    ];
    
    const queryText: string = `UPDATE planrepas SET categorie = $2, frequence = $3, nbrpersonnes = $4, nbrcalories = $5, prix = $6, numerofournisseur = $7 WHERE numeroplan = $1;`;
    const res = await client.query(queryText, values);
    client.release();
    return res;
  }

  public async deleteMealPlan(mealPlanID: number): Promise<pg.QueryResult> {
    const client = await this.pool.connect();

    const values: (number)[] = [
      mealPlanID,
    ];

    const queryText: string = `DELETE FROM planrepas WHERE numeroplan = $1;`;
    const res = await client.query(queryText, values);
    client.release()
    return res;
  }

}
