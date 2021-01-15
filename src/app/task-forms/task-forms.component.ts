import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy
} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TaskService } from '../task.service';
import { SharedService } from '../shared.service';
import { Subscription } from 'rxjs';
import { HttpLibrary } from '../shared/libraries/HttpLibrary';
import { MzToastService } from 'ngx-materialize';
import { Router } from '@angular/router';


@Component({
  selector: 'app-task-forms',
  templateUrl: './task-forms.component.html',
  styleUrls: ['./task-forms.component.css']
})
export class TaskFormsComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  type;
  @Input()
  editFormData;

  forms: FormGroup;
  refreshData = false;
  subscriptions: Subscription[] = [];
  labelsValue: any;
  formsValue: any;
  i: number;
  showForm = false;
  closed;
  time;
  hours;
  minutes;
  startDat;
  endDat;
  taskId: number;
  labelsList: object[] = [];
  labelListArray: object[] = [];
  formSubmited = false;


  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private sharedService: SharedService,
    private toastService: MzToastService) { }

  get name() {
    return this.forms.get('name');
  }
  get description() {
    return this.forms.get('description');
  }
  get startDate() {
    return this.forms.get('startDate');
  }
  get endDate() {
    return this.forms.get('endDate');
  }
  get labels() {
    return this.forms.get('labels');
  }
  get status() {
    return this.forms.get('status');
  }
  // get categories() {
  //   return this.forms.get('categories');
  // }

  optionsStartDate: Pickadate.DateOptions = {
    clear: 'Clear',
    close: 'Ok',
    today: 'Today',
    closeOnClear: true,
    closeOnSelect: false,
    format: 'yyyy-mm-dd',
    formatSubmit: 'yyyy-mm-dd',
    selectMonths: true,
    selectYears: 10
  };

  optionsEndDate: Pickadate.DateOptions = {
    clear: 'Clear',
    close: 'Ok',
    today: 'Today',
    closeOnClear: true,
    closeOnSelect: false,
    format: 'yyyy-mm-dd',
    formatSubmit: 'yyyy-mm-dd',
    selectMonths: true,
    selectYears: 10
  };

  datepickerValue: string;
  datepickerLabel = 'Label';
  datepickerPlaceholder = 'Placeholder';
  datepickerDisabled = false;
  datepickerOptions: Pickadate.DateOptions = {
    format: 'dddd, dd mmm, yyyy',
    formatSubmit: 'yyyy-mm-dd'
  };

  ngOnInit() {
    this.initForms();
    this.subscriptions.push(
      this.sharedService.getState$.subscribe(showForm => {
        this.showForm = showForm;
      })
    );
    this.subscriptions.push(
      this.sharedService.getType$.subscribe(type => {
        this.type = type;

        if (type === 'add') {
          this.forms.reset();
        } else if (type === 'edit') {
          this.patchForm();
        }
      })
    );
    this.initForms();

    this.listenToNotificationEvents();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['editFormData']) {
      this.patchForm();
    }
    this.taskId = this.editFormData.id;
  }

  ngOnDestroy() {
    HttpLibrary.unsubscribeAll(this.subscriptions);

  }

  listenToNotificationEvents() {
    this.taskService.notificationEmitter.subscribe((notification: any) => {
      // tslint:disable-next-line:max-line-length
      this.toastService.show('<span> <i class="material-icons ' + notification.cssClass + '">' + notification.type + '</i> ' + notification.message + '</span>', 3000, 'black');
    });
  }

  initForms() {
    this.forms = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      labels: ['', [Validators.required]],
      status: ['', [Validators.required]]
      // categories: ['',
      // [Validators.required]]
    });
  }

  addTask() {
    this.startDat = `${this.forms.value.startDate} 00:00`;
    this.endDat = `${this.forms.value.endDate} 00:00`;
    this.formSubmited = true;
    if (this.forms.valid) {
      this.labelsValue = this.forms.value.labels.map(el => el.tag);
      this.formsValue = this.forms.value;
      this.formsValue.labels = this.labelsValue;
      this.formsValue.startDate = this.startDat;
      this.formsValue.endDate = this.endDat;
      this.subscriptions.push(
        this.taskService.addTask(this.formsValue)
          .subscribe(data => {
            const notification = {
              message: 'The task has been successfully added.',
              type: 'check',
              cssClass: 'check-color'
            };
            this.taskService.notificationEmitter.next(notification);
            this.refreshData = true;
            this.sharedService.refreshDataInTask(this.refreshData);
            this.refreshTasks();
          })
      );
    }
  }

  updateTask(id) {
    this.formsValue = this.forms.value;
    this.startDat = `${this.formsValue.startDate.substring(0, 10)} 00:00`;
    this.endDat = `${this.formsValue.endDate.substring(0, 10)} 00:00`;
    if (this.forms.valid) {
      this.formsValue.startDate = this.startDat;
      this.formsValue.endDate = this.endDat;
      this.formSubmited = true;
      if (this.forms.valid) {
        this.labelsValue = this.forms.value.labels;
        for (let i = 0; i < this.labelsValue.length; i++) {
          if (typeof this.labelsValue[i] === 'object') {
            this.labelsValue[i] = this.labelsValue.map(el => el.tag)[i];
            this.formsValue.labels[i] = this.labelsValue[i];
          }
        }
      }
      this.formsValue.id = this.taskId;
      this.subscriptions.push(
        this.taskService.updateTask(this.formsValue)
          .subscribe(data => {
            const notification = {
              message: 'The task has been successfully updated.',
              type: 'check',
              cssClass: 'check-color'
            };
            this.taskService.notificationEmitter.next(notification);
            this.refreshData = true;
            this.sharedService.refreshDataInTask(this.refreshData);
            this.refreshTasks();
          })
      );
    }
  }


  closeForm() {
    this.refreshTasks();
  }

  refreshTasks() {
    this.showForm = false;
    this.sharedService.addButtonClicked(this.showForm);
    this.forms.reset();
    this.labels.patchValue([]);
    this.formSubmited = false;
  }

  patchForm() {
    if (this.editFormData.labels) {
      this.labelListArray = [];
      for (let i = 0; i < this.editFormData.labels.length; i++) {
        this.labelListArray[i] = { tag: this.editFormData.labels[i] };
      }
      if (this.forms && this.editFormData && this.type === 'edit') {
        this.forms.patchValue({
          name: this.editFormData.name,
          description: this.editFormData.description,
          startDate: this.editFormData.startDate,
          endDate: this.editFormData.endDate,
          labels: (this.labelsList = [...this.labelListArray]),
          status: this.editFormData.status
        });
      }
    }
  }
}
