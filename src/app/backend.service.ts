import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  
  private baseUrl = "https://api.youneedabudget.com/v1";
  private headers = new HttpHeaders()
                    .set('Authorization', 'Bearer cd9c19b4c13f5cfdda66e5b250a2cb85b2bd67a2fbf59c026cbf22905ebcef95')
                    .set('content-type','application/json')

  constructor(private http: HttpClient) {
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  getBudgetList() {
    return this.http.get(this.baseUrl+"/budgets?include_accounts=true", { headers: this.headers })
    .pipe(catchError(this.handleError));
  }

  getBudgetDetails(budget_id : string) {
    return this.http.get(this.baseUrl+"/budgets/"+budget_id, { headers: this.headers })
    .pipe(catchError(this.handleError));
  }

  createNewAccount(budget_id: string, createNewAccount : any,) {
    return this.http.post(this.baseUrl+"/budgets/"+budget_id+"/accounts",  createNewAccount, { headers: this.headers })
    .pipe(catchError(this.handleError));
  }

  getPayeeTransactions(budget_id : string, payee_id : string) {
    return this.http.get(this.baseUrl+"/budgets/"+budget_id+"/payees/"+payee_id+"/transactions", { headers: this.headers })
    .pipe(catchError(this.handleError));
  }

  makeTransaction(budget_id: string, postObject : any,) {
    return this.http.post(this.baseUrl+"/budgets/"+budget_id+"/transactions",  postObject, { headers: this.headers })
    .pipe(catchError(this.handleError));
  }
  
}
