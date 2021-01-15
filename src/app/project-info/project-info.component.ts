import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from '../shared.service';
import { HttpLibrary } from '../shared/libraries/HttpLibrary';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css']
})
export class ProjectInfoComponent implements OnInit, OnDestroy {
  projectName: string;
  type = 'add';
  showForm: boolean;
  subscriptions: Subscription[] = [];

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.subscriptions.push(
      this.sharedService.getState$.subscribe(showForm => {
        setTimeout(() => (this.showForm = showForm), 100);
      })
    );
    this.showForm = false;
    this.projectName = 'Project Name B';
    this.subscriptions.push(this.sharedService.getState$.subscribe(
      showForm => {
        setTimeout(() => this.showForm = showForm, 100);
      }));
  }

  onAddButtonClicked() {
    this.showForm = true;
    this.sharedService.addButtonClicked(this.showForm);
  }

  onSendFormType() {
    this.sharedService.sendFormType(this.type);
  }

  ngOnDestroy() {
    HttpLibrary.unsubscribeAll(this.subscriptions);
  }

}
