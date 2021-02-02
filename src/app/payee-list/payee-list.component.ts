import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../backend.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-payee-list',
  templateUrl: './payee-list.component.html',
  styleUrls: ['./payee-list.component.css']
})
export class PayeeListComponent implements OnInit {
  loader: boolean = false;
  budgetDetails: any;
  budgetPayees: any = [];
  budgetAccounts: any = [];
  payeeTransactions: any;
  payeeCount: any = 0;
  payeeDetails: any;
  payeeTransactionsCount: any = 0;
  makeTransaction = new FormGroup({
    accountName: new FormControl(''),
    payee: new FormControl(''),
    memo: new FormControl(''),
    amount: new FormControl(0)
  });
  constructor(private route: ActivatedRoute, private backendService: BackendService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.getBudgetPayeeList();
  }

  getBudgetPayeeList():void {
    this.loader = true;
    this.route.params.subscribe(params => {
      this.backendService.getBudgetDetails(params.budget_id).subscribe((data:any)=>{
        this.budgetDetails = data.data.budget;
        this.budgetPayees = this.budgetDetails.payees ? this.budgetDetails.payees : [];
        this.budgetAccounts = this.budgetDetails.accounts ? this.budgetDetails.accounts : [];
        this.payeeDetails = this.budgetPayees[0] ? this.budgetPayees[0] : [];
        this.payeeCount = this.budgetPayees.length;
        this.loader = false;
      });
    })
  }

  openPayeeDetails(budget_id:string, payee_id: string) {
    this.loader = true;
    let payeeDetailsFilter = this.budgetPayees.find((payee: any) => payee.id == payee_id);
    this.payeeDetails = payeeDetailsFilter;
    $("#viewPayeeDetails").modal('show');
    this.backendService.getPayeeTransactions(budget_id, payee_id).subscribe((data:any)=>{
      this.payeeTransactions = data.data.transactions;
      this.payeeTransactionsCount = this.payeeTransactions.length;
      this.loader = false;
    });
    
  }
  closePayeeDetails():void {
    $("#viewPayeeDetails").modal('hide');
  }

  openMakeTransaction(budget_id:string, payee_id: string){
    this.makeTransaction.reset();
    $("#makeNewTransaction").modal('show');
  }

  closeMakeTransaction():void {
    $("#makeNewTransaction").modal('hide');
  }

  initForm() : void {
    this.makeTransaction = this.fb.group({
      accountName: ['', [Validators.required]],
      payee: ['', Validators.required],
      memo: ['', Validators.required],
      amount: [0, Validators.required],
    })
  }

  isValidInput(fieldName: any): boolean {
    return this.makeTransaction.controls[fieldName].invalid &&
      (this.makeTransaction.controls[fieldName].dirty || this.makeTransaction.controls[fieldName].touched);
  }
  isRequiredInput(fieldName: any): boolean {
    return true;
  }

  onSubmit() {
    this.loader = true;
    let postObject = {
        "transaction": {
          "account_id": this.makeTransaction.value.accountName,
          "date": new Date(),
          "payee_id": this.makeTransaction.value.payee,
          "memo": this.makeTransaction.value.memo,
          "amount": this.makeTransaction.value.amount
        }
    }
    this.backendService.makeTransaction(this.budgetDetails.id, postObject).subscribe((data:any)=>{
      alert("Transaction added successfully");
      this.closeMakeTransaction();
      this.loader = false;
    });
  }

}
