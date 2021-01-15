import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  dropdownOpenEvent = new Subject<boolean>();
  dropdownList = [];
  arrowList = [];

  private getStateAfterAddClicked = new Subject<boolean>();
  private getTypeAfterAddClicked = new Subject<string>();
  private getTasksAfterAction = new Subject<boolean>();
  private getSearchTask = new Subject<string>();

  getState$ = this.getStateAfterAddClicked.asObservable();
  getType$ = this.getTypeAfterAddClicked.asObservable();
  getTasks$ = this.getTasksAfterAction.asObservable();
  getSearch$ = this.getSearchTask.asObservable();

  constructor() { }

  addButtonClicked(showForm: boolean) {
    this.getStateAfterAddClicked.next(showForm);
  }

  sendFormType(type: string) {
    this.getTypeAfterAddClicked.next(type);
  }

  refreshDataInTask(refreshData: boolean) {
    this.getTasksAfterAction.next(refreshData);
  }

  searchTasks(search: string) {
    this.getSearchTask.next(search);
  }
}
