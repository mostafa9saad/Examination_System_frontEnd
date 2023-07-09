import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TestBuilderComponent } from './components/admin/test-builder/test-builder.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ExamsListComponent } from './components/exams-list/exams-list.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { authGaurdGuard } from './Gaurd/auth-gaurd.guard';
import { StdtableComponent } from './components/admin/stdtable/stdtable.component';
import { hasRoleGuard } from './Gaurd/has-role.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { StudentExamsComponent } from './components/admin/student-exams/student-exams.component';
import { NewExamComponent } from './components/admin/new-exam/new-exam.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGaurdGuard, hasRoleGuard],
    data: {
      role: 'admin',
    },
    children: [
      {
        path: 'testbuilder',
        component: TestBuilderComponent,
        canActivate: [authGaurdGuard, hasRoleGuard],
        data: {
          role: 'admin',
        },
      },
      {
        path: 'students',
        component: StdtableComponent,
        canActivate: [authGaurdGuard, hasRoleGuard],
        data: {
          role: 'admin',
        },
      },
      {
        path: 'studentsExams',
        component: StudentExamsComponent,
        canActivate: [authGaurdGuard, hasRoleGuard],
        data: {
          role: 'admin',
        },
      },
      {
        path: 'newExam',
        component: NewExamComponent,
        canActivate: [authGaurdGuard, hasRoleGuard],
        data: {
          role: 'admin',
        },
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'examlist',
    component: ExamsListComponent,
    canActivate: [authGaurdGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGaurdGuard],
  },
  { path: 'Quiz/:id', component: QuizComponent, canActivate: [authGaurdGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
