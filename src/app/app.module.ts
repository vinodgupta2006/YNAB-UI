import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BudgetListComponent } from './budget-list/budget-list.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AccountListComponent } from './account-list/account-list.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { PayeeListComponent } from './payee-list/payee-list.component';

@NgModule({
  declarations: [
    AppComponent,
    BudgetListComponent,
    HeaderComponent,
    FooterComponent,
    AccountListComponent,
    NoPageFoundComponent,
    PayeeListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
