import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoPageFoundComponent } from './no-page-found.component';

describe('NoPageFoundComponent', () => {
  let component: NoPageFoundComponent;
  let fixture: ComponentFixture<NoPageFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoPageFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoPageFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('It will render no page found template if route is not found', () => {
    expect(component).toBeTruthy();
  });
});
