import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from '../user-info/user-info.component';
import { NotificationComponent } from '../notification/notification.component';
import { ModalComponentComponent } from '../modal-component/modal-component.component';
import { ModalButtonComponent } from '../modal-button/modal-button.component';
import { SearchComponent } from '../search/search.component';
import { MzModalModule, MzDropdownModule } from 'ngx-materialize';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { SidebarButtonsComponent } from '../sidebar-buttons/sidebar-buttons.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { SharedService } from '../shared.service';

@NgModule({
  imports: [
    CommonModule,
    MzModalModule,
    MzDropdownModule
  ],
  declarations: [
    UserInfoComponent,
    NotificationComponent,
    ModalComponentComponent,
    ModalButtonComponent,
    SearchComponent,
    DropdownComponent,
    SearchComponent,
    SidebarButtonsComponent,
    SideBarComponent
  ],
  exports: [
    SearchComponent,
    UserInfoComponent,
    ModalComponentComponent,
    ModalButtonComponent,
    NotificationComponent,
    ModalComponentComponent,
    ModalButtonComponent,
    DropdownComponent,
    SidebarButtonsComponent,
    SideBarComponent,
    SearchComponent
  ],
  providers: [SharedService],
  entryComponents: [ModalComponentComponent, DropdownComponent]
})
export class SharedModule { }
