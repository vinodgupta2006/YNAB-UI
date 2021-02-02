import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BudgetListComponent } from './budget-list/budget-list.component';
import { AccountListComponent } from './account-list/account-list.component';
import { PayeeListComponent } from './payee-list/payee-list.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/mybudgets', pathMatch: 'full' },
  { path: 'mybudgets', component: BudgetListComponent },
  { path: 'budget-accounts/:budget_id', component: AccountListComponent },
  { path: 'budget-payees/:budget_id', component: PayeeListComponent },
  { path: '**', component: NoPageFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
