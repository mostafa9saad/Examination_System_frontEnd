import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TestBuilderComponent } from './components/admin/test-builder/test-builder.component';
import { RegisterComponent } from './components/register/register.component';

import { ExamsListComponent } from './components/exams-list/exams-list.component';
import { NavComponent } from './components/nav/nav.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { StdtableComponent } from './components/admin/stdtable/stdtable.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StudentExamsComponent } from './components/admin/student-exams/student-exams.component';
import { NewExamComponent } from './components/admin/new-exam/new-exam.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    TestBuilderComponent,
    RegisterComponent,

    ExamsListComponent,
    NavComponent,
    QuizComponent,
    StdtableComponent,
    MainNavComponent,
    ProfileComponent,
    StudentExamsComponent,
    NewExamComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
        allowedDomains: ['https://localhost:44383'],
        disallowedRoutes: [],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
