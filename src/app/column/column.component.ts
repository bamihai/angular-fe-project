import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITask } from '../shared/entities/task';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent implements OnInit {

  @Input() tasks: ITask[];
  @Input() columnTitle;
  @Input() columnClass;
  @Input() borderClass;
  @Output() taskId = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onShowEdit($event) {
    this.taskId.emit($event);
  }

}
