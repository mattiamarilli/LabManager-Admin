import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component'
import {SessionComponent} from './session/session.component'
import {AnalitycsComponent} from './analitycs/analitycs.component'
import {MaterialMenagementComponent} from './material-menagement/material-menagement.component'
import { RegestryMenagementComponent} from './regestry-menagement/regestry-menagement.component'


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'session',component:SessionComponent},
  { path: 'analitycs',component:AnalitycsComponent},
  { path: 'materialmenagement',component:MaterialMenagementComponent},
  { path: 'regestrymenagement',component:RegestryMenagementComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
