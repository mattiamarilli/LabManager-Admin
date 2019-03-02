import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component'
import {SessionComponent} from './session/session.component'


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {path: 'session',component:SessionComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
