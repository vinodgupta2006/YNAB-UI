import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { BackendService } from '../backend.service';
declare var $: any;

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  budgetDetails: any;
  accountDetails: any;
  budgetAccounts: any = [];
  budgetAccountsCount: any = 0;
  loader: boolean = false;
  createNewAccount = new FormGroup({
    accountType: new FormControl(''),
    accountName: new FormControl(''),
    accountBalance: new FormControl(0)
  });

  constructor(private route: ActivatedRoute, private backendService: BackendService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.getBudgetDetails();
  }

  getBudgetDetails():void {
    this.loader = true;
    this.route.params.subscribe(params => {
      this.backendService.getBudgetDetails(params.budget_id).subscribe((data:any)=>{
        this.budgetDetails = data.data.budget;
        let filteredAccount = this.budgetDetails.accounts.filter((account: any) => account.deleted === false);
        let sortedFilteredAccount = filteredAccount.sort(function(a:any, b:any) {return b.balance-a.balance} );
        this.budgetAccounts = sortedFilteredAccount ? sortedFilteredAccount : [];
        this.accountDetails = this.budgetAccounts[0] ? this.budgetAccounts[0] : [];
        this.budgetAccountsCount = this.budgetAccounts.length;
        this.loader = false;
      });
    })
  }

  openAddForm():void {
    this.createNewAccount.reset();
    $("#addNewAccount").modal('show');
  }

  closeAddForm(): void {
    $("#addNewAccount").modal('hide');
  }

  initForm() : void {
    this.createNewAccount = this.fb.group({
      accountType: ['', [Validators.required]],
      accountName: ['', Validators.required],
      accountBalance: [0, Validators.required],
    })
  }

  isValidInput(fieldName: any): boolean {
    return this.createNewAccount.controls[fieldName].invalid &&
      (this.createNewAccount.controls[fieldName].dirty || this.createNewAccount.controls[fieldName].touched);
  }
  isRequiredInput(fieldName: any): boolean {
    return true; // this.createNewAccount.controls[fieldName].errors.required;
  }

  onSubmit() {
    this.loader = true;
    let postObject = {
        "account": {
          "name": this.createNewAccount.value.accountName,
          "type": this.createNewAccount.value.accountType,
          "balance": this.createNewAccount.value.accountBalance
        }
    }
    this.backendService.createNewAccount(this.budgetDetails.id, postObject).subscribe((data:any)=>{
      alert("Account added successfully");
      this.closeAddForm();
      this.getBudgetDetails();
      this.loader = false;
    });
  }


  openAccountDetails(acount_id:string) {
    let accountDetailsObject = this.budgetAccounts.find((account: any) => account.id == acount_id);
    this.accountDetails = accountDetailsObject;
    $("#viewAccountDetails").modal('show');
  }
  closeAccountDetails():void {
    $("#viewAccountDetails").modal('hide');
  }

  

}
