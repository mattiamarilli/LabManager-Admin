import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component'
import {SessionComponent} from './session/session.component'
import {AnalitycsComponent} from './analitycs/analitycs.component'
import {MaterialMenagementComponent} from './material-menagement/material-menagement.component'
import { RegestryMenagementComponent} from './regestry-menagement/regestry-menagement.component'
import {LoginComponent} from './login/login.component'
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent ,canActivate: [AuthGuard]},
  { path: 'session',component:SessionComponent},
  { path: 'analitycs',component:AnalitycsComponent},
  { path: 'materialmenagement',component:MaterialMenagementComponent},
  { path: 'regestrymenagement',component:RegestryMenagementComponent},
  { path: 'login',component:LoginComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
