import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task.component';
import { ColumnComponent } from '../column/column.component';
import { ColumnHeaderComponent } from '../column-header/column-header.component';
import { TextBoxComponent } from '../text-box/text-box.component';
import { TaskFormsComponent } from '../task-forms/task-forms.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedService } from '../shared.service';
import { MzChipModule } from 'ngx-materialize';
import { MzDatepickerModule } from 'ngx-materialize';
import { FormsModule} from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MzChipModule,
    SharedModule,
    MzDatepickerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [TaskComponent,
    ColumnComponent,
    ColumnHeaderComponent,
    TextBoxComponent,
    TaskFormsComponent
  ],
  providers: [SharedService],
  declarations: [
    TaskComponent,
    ColumnComponent,
    ColumnHeaderComponent,
    TextBoxComponent,
    TaskFormsComponent
  ]
})
export class TaskModule { }
