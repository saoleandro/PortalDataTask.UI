import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksListComponent } from './components/tasks/tasks-list/tasks-list.component';
import { AddDataTaskComponent } from './components/tasks/add-data-task/add-data-task.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuardService],
    component: DashboardComponent
  },
  {
    path: 'tasks',
    component: TasksListComponent
  },
  {
    path: 'tasks/add',
    component: AddDataTaskComponent
  },
  {
    path: 'tasks/edit/:id',
    component: AddDataTaskComponent
  },
  {
    path: 'tasks/delete/:id',
    component: TasksListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
