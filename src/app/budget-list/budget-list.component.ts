import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.css']
})

export class BudgetListComponent implements OnInit {
  budgets: any;
  loader: boolean = false;

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.getBudgetList();
  }

  getBudgetList(){
    this.loader = true;
    this.backendService.getBudgetList().subscribe((data:any)=>{
      this.budgets = data.data.budgets;
      this.loader = false;
    },error => {
      console.log("Error while fetching budget list: ",error);
    })
  }

}
