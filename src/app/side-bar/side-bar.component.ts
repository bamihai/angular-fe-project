import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { SharedService } from '../shared.service';
import { Subscription } from 'rxjs';
import { HttpLibrary } from '../shared/libraries/HttpLibrary';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit , OnDestroy {
  icons = [
    {
      iconName: 'dashboard',
      title: 'Dashboard'
    },
    {
      iconName: 'view_week',
      title: 'Board'
    },
    {
      iconName: 'people',
      title: 'Team'
    },
    {
      iconName: 'settings',
      title: 'Settings'
    },
    {
      iconName: 'power_settings_new',
      title: 'Log off'
    }
  ];

  @Input() showAddTask;
  subscriptions: Subscription[] = [];
  showForm = false;
  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.subscriptions.push(
      this.sharedService.getState$.subscribe(showForm => {
        this.showForm = showForm;
      })
    );
  }
  ngOnDestroy() {
      HttpLibrary.unsubscribeAll(this.subscriptions);
  }
}
