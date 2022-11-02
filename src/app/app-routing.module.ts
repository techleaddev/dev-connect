import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
