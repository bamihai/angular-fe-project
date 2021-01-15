import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-buttons',
  templateUrl: './sidebar-buttons.component.html',
  styleUrls: ['./sidebar-buttons.component.css']
})
export class SidebarButtonsComponent implements OnInit {
 @Input() icon: string;
  constructor() { }

  ngOnInit() {
  }






}
