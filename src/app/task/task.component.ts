import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../task.service';
import { ITask } from '../shared/entities/task';
import { Subscription } from 'rxjs';
import { HttpLibrary } from '../shared/libraries/HttpLibrary';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent implements OnInit, OnDestroy {
  @Output() taskInfo = new EventEmitter<object>();

  ToDoTasks: ITask[] = [];
  InProgressTasks: ITask[] = [];
  DoneTasks: ITask[] = [];
  idTask;
  task;
  tasks: ITask[];
  open = 'open';
  close = 'close';
  showForm = false;
  refreshData = false;
  SearchedWord: string;
  tasksArray: ITask[];
  searched = false;
  private subscriptions: Subscription[] = [];
  private httpSubscriptions: Subscription[] = [];


  constructor(
    private taskService: TaskService,
    private sharedService: SharedService) { }

  ngOnInit() {
    this.httpSubscriptions.push(this.taskService.getTasks().subscribe((taskList: ITask[]) => {
      this.tasks = taskList;
      this.ToDoTasks = this.tasks.filter(el => el.status === 'TODO');
      this.InProgressTasks = this.tasks.filter(el => el.status === 'PROGRESS');
      this.DoneTasks = this.tasks.filter(el => el.status === 'DONE');
    }));
    this.subscriptions.push(this.sharedService.getState$.subscribe(
      showForm => {
        this.showForm = showForm;
      }));
    this.subscriptions.push(this.sharedService.getTasks$.subscribe(
      refreshData => {
        this.refreshData = refreshData;
        if (this.refreshData === true) {
          this.refresh();
        }
      })
    );
    this.subscriptions.push(this.sharedService.getSearch$.subscribe(
      value => {
        this.SearchedWord = value;
        this.searched = true;
        if (this.searched === true) {
          this.tasksArray = this.tasks.filter(el => el.name.toLowerCase().includes(this.SearchedWord.toLowerCase()));
          this.ToDoTasks = this.tasksArray.filter(el => el.status === 'TODO');
          this.InProgressTasks = this.tasksArray.filter(el => el.status === 'PROGRESS');
          this.DoneTasks = this.tasksArray.filter(el => el.status === 'DONE');
        }
      }))
  }

  refresh() {
    this.httpSubscriptions.push(this.taskService.getTasks().subscribe((taskList: ITask[]) => {
      this.tasks = taskList;
      this.ToDoTasks = this.tasks.filter(el => el.status === 'TODO');
      this.InProgressTasks = this.tasks.filter(el => el.status === 'PROGRESS');
      this.DoneTasks = this.tasks.filter(el => el.status === 'DONE');
    },
      err => { },
      () => {
        this.refreshData = false;
        this.sharedService.refreshDataInTask(this.refreshData);
      }));
  }

  showId($event) {
    this.idTask = $event;
    this.task = this.tasks.find(el => el.id === this.idTask);
    this.taskInfo.emit(this.task);
  }

  ngOnDestroy(): void {
    HttpLibrary.unsubscribeAll(this.subscriptions);
    HttpLibrary.unsubscribeAll(this.httpSubscriptions);
  }

}
