import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CanAcssessAdminGuard } from './guards/can-acssess-admin.guard';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { HomeComponent } from './pages/dashboard/home/home.component';
import { TodoListComponent } from './pages/dashboard/todo-list/todo-list.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
    canActivate: [CanAcssessAdminGuard],
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'todo',
        component: TodoListComponent,
      },
      {
        path: ':id',
        component: HomeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanAcssessAdminGuard],
})
export class AppRoutingModule {}
