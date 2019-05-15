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
  { path: 'user', component:UserComponent},
  { path: 'analitycs',component:AnalitycsComponent},
  { path: 'login',component:LoginComponent},
  { path: 'class',component:ClassComponent},
  { path: 'student', component:StudentComponent },
  { path : 'teacher', component: TeacherComponent},
  { path: 'tool', component: ToolComponent},
  { path: '', redirectTo: '/class', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
