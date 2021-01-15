import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskModule } from '../task/task.module';
import { ProjectInfoComponent } from '../project-info/project-info.component';
import { AddTaskComponent } from '../add-task/add-task.component';
import { SidebarButtonsComponent } from '../sidebar-buttons/sidebar-buttons.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    SharedModule,
    TaskModule,
    RouterModule
  ],
  declarations: [
    LayoutComponent,
    ProjectInfoComponent,
    AddTaskComponent
  ],
  exports: [
    LayoutComponent,
    ProjectInfoComponent,
    AddTaskComponent,
    SidebarButtonsComponent,
    SideBarComponent
  ],
})

export class LayoutModule { }
