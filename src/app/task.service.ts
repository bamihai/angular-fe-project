import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ITask } from './shared/entities/task';
import { MzToastService } from 'ngx-materialize';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  taskUrl = 'api/tasks/';
  notificationEmitter = new Subject<object>();
  private getDataAfterUpdate = new Subject<boolean>();

  getData$ = this.getDataAfterUpdate.asObservable();

  constructor(private http: HttpClient,
    private toastService: MzToastService) { }

  listenToNotificationEvents() {
    this.notificationEmitter.subscribe((notification: any) => {
      // tslint:disable-next-line:max-line-length
      this.toastService.show('<span> <i class="material-icons ' + notification.cssClass + '">' + notification.type + '</i> ' + notification.message + '</span>', 3000, 'black');
    });
  }

  getTasks() {
    return this.http.get(this.taskUrl).pipe(
      map((res: ITask[]) => {
        return <ITask[]>res;
      }), catchError(e => this.handleError(e)));
  }

  addTask(task: ITask): Observable<ITask> {
    return this.http
      .post<ITask>(this.taskUrl, task)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    const errMsg = error.message
      ? error.message
      : error.status
        ? `${error.status} - ${error.stausText}`
        : 'Oops! Something went wrong on the server';
        const notification = {
          message: 'Oops! Something went wrong on the server',
          type: 'close',
          cssClass: 'check-colour'
        };
        this.notificationEmitter.next(notification);
    return throwError(errMsg);
  }

  deleteTask(id: number): Observable<{}> {
    return this.http.delete(`${this.taskUrl}${id}`);
  }

  updateTask(task: ITask): Observable<ITask> {
    return this.http
      .put<ITask>(`${this.taskUrl}${task.id}`, task)
      .pipe(catchError(this.handleError));
  }

}

