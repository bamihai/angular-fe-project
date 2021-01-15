import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpLibrary } from '../shared/libraries/HttpLibrary';
import { TaskService } from '../task.service';
import { ITask } from '../shared/entities/task';

@Component({
  selector: 'app-delete-request-test',
  templateUrl: './delete-request-test.component.html',
  styleUrls: ['./delete-request-test.component.css']
})
export class DeleteRequestTestComponent implements OnInit, OnDestroy {
  id: number;
  subscriptions: Subscription[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    HttpLibrary.unsubscribeAll(this.subscriptions);
  }

  delete(task: any) {
    this.subscriptions.push(
      this.taskService.deleteTask(task.id).subscribe(
        data => { }
      ));
  }
}
