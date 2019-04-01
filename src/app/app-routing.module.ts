import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component'
import {AnalitycsComponent} from './analitycs/analitycs.component'

import {LoginComponent} from './login/login.component'
import { AuthGuard } from './_guards/auth.guard';
import { ClassComponent } from './class/class.component'
import {StudentComponent} from './student/student.component'
import {TeacherComponent} from './teacher/teacher.component'
import {ToolComponent} from './tool/tool.component'

const routes: Routes = [
  { path: 'home', component: HomeComponent /*,canActivate: [AuthGuard]*/},
  { path: 'analitycs',component:AnalitycsComponent},
  { path: 'login',component:LoginComponent},
  { path: 'class',component:ClassComponent},
  { path: 'student', component:StudentComponent },
  {path : 'teacher', component: TeacherComponent},
  {path: 'tool', component: ToolComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
