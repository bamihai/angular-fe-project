import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  name: string;
  position: string;
  
  constructor() { }

  ngOnInit() {
    this.name = 'Thomas Burton';
    this.position = 'web developer';
  }

}
