import { Component, OnInit, OnDestroy } from '@angular/core';
import { state, animate, transition, trigger, style } from '@angular/animations';
import { TaskService } from '../task.service';
import { SharedService } from '../shared.service';
import { Subscription } from 'rxjs';
import { HttpLibrary } from '../shared/libraries/HttpLibrary';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({ width: '21em' })),
      state('close', style({ width: '10em', display: 'none' })),
      transition('close => open', animate(200)),
      transition('open => close', animate(0)
      )])]
})

export class AddTaskComponent implements OnInit, OnDestroy {
  state: boolean;
  type: string;
  showEditComponent = false;
  taskToEdit = {};
  subscriptions: Subscription[] = [];
  showForm = false;

  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.sharedService.getState$.subscribe(showForm => {
        this.showForm = showForm;
      })
    );
  }

  showTask($event) {
    this.taskToEdit = $event;
  }

  ngOnDestroy() {
    HttpLibrary.unsubscribeAll(this.subscriptions);
  }

}
