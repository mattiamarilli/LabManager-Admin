import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AnalitycsComponent} from './analitycs/analitycs.component'

import {LoginComponent} from './login/login.component'
import { AuthGuard } from './_guards/auth.guard';
import { ClassComponent } from './class/class.component'
import {StudentComponent} from './student/student.component'
import {TeacherComponent} from './teacher/teacher.component'
import {ToolComponent} from './tool/tool.component'
import {UserComponent} from './user/user.component'

const routes: Routes = [
  { path: 'user', component:UserComponent,canActivate: [AuthGuard]},
  { path: 'analitycs',component:AnalitycsComponent,canActivate: [AuthGuard]},
  { path: 'login',component:LoginComponent},
  { path: 'class',component:ClassComponent,canActivate: [AuthGuard]},
  { path: 'student', component:StudentComponent,canActivate: [AuthGuard] },
  { path : 'teacher', component: TeacherComponent,canActivate: [AuthGuard]},
  { path: 'tool', component: ToolComponent,canActivate: [AuthGuard]},
  { path: '', redirectTo: '/class', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
