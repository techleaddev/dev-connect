import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ModalComponent } from './component/modal/modal.component';

import { MatDialogModule } from '@angular/material/dialog';
import { ProjectListComponent } from './pages/project/project-list/project-list.component';
import { ShowValidateComponent } from './component/show-validate/show-validate.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { DashboardProjectComponent } from './pages/dashboard/dashboard-project/dashboard-project.component';
import { DbListMemberComponent } from './pages/dashboard/db-list-member/db-list-member.component';
import { ModalAddMemberComponent } from './component/modal-add-member/modal-add-member.component';
import { DbListStatusComponent } from './pages/dashboard/db-list-status/db-list-status.component';
import { ModalAddStatusComponent } from './component/modal-add-status/modal-add-status.component';
import { AuthInterceptor } from './services/auth.intercepter';
import { ModalAddTagComponent } from './component/modal-add-tag/modal-add-tag.component';
import { DbListTagComponent } from './pages/dashboard/db-list-tag/db-list-tag.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartPieComponent } from './pages/dashboard/chart-pie/chart-pie.component';
import { TodoComponent } from './pages/dashboard/todo/todo.component';
import { ModalTodoComponent } from './component/modal-todo/modal-todo.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { MatMenuModule } from '@angular/material/menu';
@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    HomepageComponent,
    ModalComponent,
    ProjectListComponent,
    ShowValidateComponent,
    DashboardComponent,
    DashboardProjectComponent,
    DbListMemberComponent,
    ModalAddMemberComponent,
    DbListStatusComponent,
    ModalAddStatusComponent,
    ModalAddTagComponent,
    DbListTagComponent,
    ChartPieComponent,
    TodoComponent,
    ModalTodoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatDialogModule,
    NgApexchartsModule,
    DragDropModule,
    MatMenuModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
