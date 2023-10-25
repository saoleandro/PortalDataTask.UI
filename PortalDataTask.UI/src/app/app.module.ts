import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksListComponent } from './components/tasks/tasks-list/tasks-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AddDataTaskComponent } from './components/tasks/add-data-task/add-data-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from './components/shared/toast/toast.component';
import { LoadmaskComponent } from './components/shared/loadmask/loadmask.component';
import { ModalComponent } from './components/shared/modal/modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppHeaderComponent } from './components/shared/app-header/app-header.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksListComponent,
    AddDataTaskComponent,
    ToastComponent,
    LoadmaskComponent,
    ModalComponent,
    LoginComponent,
    DashboardComponent,
    AppHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }