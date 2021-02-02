import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormGroup, ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { PayeeListComponent } from './payee-list.component';

describe('PayeeListComponent', () => {
  let component: PayeeListComponent;
  let fixture: ComponentFixture<PayeeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayeeListComponent ],
      imports:[RouterTestingModule, HttpClientModule, FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Get list of all payees', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form to create new account using formbuilder', () => {
    expect(component.makeTransaction instanceof FormGroup).toBeTruthy();
  });

});
