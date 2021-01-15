import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITask } from '../shared/entities/task';
import { Subscription } from 'rxjs';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.css']
})
export class TextBoxComponent implements OnInit {
  @Output() showEdit = new EventEmitter<string>();
  @Input() childMessage: ITask;
  @Input() className;
  @Input() borderClass;
  @Input() taskId;
  formId;
  showModal;
  subscriptions: Subscription[] = [];

  constructor() { }

  ngOnInit() {
    this.formId = this.childMessage.id;
  }

  showForm(open: boolean) {
    this.showEdit.emit(this.formId);
  }

  onDeleteClicked(clicked: boolean) {
    this.showModal = clicked;
  }

  onDeleteAborted(deleted: boolean) {
    this.showModal = deleted;
  }
}
