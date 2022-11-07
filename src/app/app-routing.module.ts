import { DashboardProjectComponent } from './pages/dashboard/dashboard-project/dashboard-project.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  {
    path:"signup",
    component: SignupComponent
  },
  {
    path:"signin",
    component: SigninComponent,
  },
  {
    path:"",
    component:HomepageComponent,
  },
  {
    path:"dashboard",
    component: DashboardComponent,
    children:[
      {
        path:':id',
        component:DashboardProjectComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
