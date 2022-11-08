import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { MateriaModule } from '../../materia-module';
import { ModalPopupComponent } from './pages/modal-popup/modal-popup.component';
import { HeaderComponent } from './components/header/header.component';
import { ShowvalidateComponent } from './components/showvalidate/showvalidate.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { HomeComponent } from './pages/dashboard/home/home.component';
import { StatusComponent } from './pages/dashboard/status/status.component';
import { MemberComponent } from './pages/dashboard/member/member.component';
import { ModalMemberComponent } from './pages/dashboard/modal-member/modal-member.component';
import { ModalStatusComponent } from './pages/dashboard/modal-status/modal-status.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    WelcomeComponent,
    ModalPopupComponent,
    HeaderComponent,
    ShowvalidateComponent,
    DashboardComponent,
    HomeComponent,
    StatusComponent,
    MemberComponent,
    ModalMemberComponent,
    ModalStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MateriaModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
