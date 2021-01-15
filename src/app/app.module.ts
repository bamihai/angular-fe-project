import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskService } from './task.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './layout/layout.module';
import { AppRoutingModule } from './app.routes';
import { RouterModule} from '@angular/router';
import { MzToastModule } from 'ngx-materialize';
@NgModule({
  declarations: [AppComponent],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    LayoutModule,
    AppRoutingModule,
    RouterModule,
    MzToastModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule {}
