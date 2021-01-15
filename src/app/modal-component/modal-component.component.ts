import { Component, OnDestroy, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MzBaseModal, MzToastService } from 'ngx-materialize';
import { SharedService } from '../shared.service';
import { TaskService } from '../task.service';
import { Subscription } from 'rxjs';
import { HttpLibrary } from '../shared/libraries/HttpLibrary';


@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.css']
})
export class ModalComponentComponent extends MzBaseModal implements OnInit, OnDestroy {
  @Input() formId;
  @Output() deleteAborted = new EventEmitter<boolean>();
  id: number;
  refreshData = false;
  subscriptions: Subscription[] = [];
  clicked: boolean;
  delete: boolean;

  constructor(
    private sharedService: SharedService,
    private taskService: TaskService,
    private toastService: MzToastService) {
    super();
  }

  ngOnInit() {
    this.id = this.formId;
  }
  listenToNotificationEvents1() {
    this.taskService.notificationEmitter.subscribe((notification: any) => {
      // tslint:disable-next-line:max-line-length
      this.toastService.show('<span> <i class="material-icons ' + notification.cssClass + '">' + notification.type + '</i> ' + notification.message + '</span>', 3000, 'black');
    });
  }
  deleteTask(id: number) {
    this.subscriptions.push(
      this.taskService.deleteTask(id).subscribe(
        data => {
          const notification = {
            message: 'The task has been successfully deleted.',
            type: 'check',
            cssClass: 'check-color'
          };
          this.taskService.notificationEmitter.next(notification);
          this.refreshData = true;
          this.sharedService.refreshDataInTask(this.refreshData);
        }));
  }

  onDeleteAborted() {
    this.clicked = false;
    this.deleteAborted.emit(this.clicked);
  }

  ngOnDestroy() {
    HttpLibrary.unsubscribeAll(this.subscriptions);
  }
}
