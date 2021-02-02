import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() loaderFlag: boolean = false;

  userName: string = "Guest";


  @Output() messageEvent = new EventEmitter<string>();

  constructor() {
    
   }
  ngOnInit(): void {
    
  }
  
}
