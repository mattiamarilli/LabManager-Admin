import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AnalitycsComponent } from './analitycs/analitycs.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ClassComponent } from './class/class.component';
import { StudentComponent } from './student/student.component'
import { TeacherComponent } from './teacher/teacher.component';
import { ToolComponent } from './tool/tool.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { API_URL } from './_shared/injectionTokens';
import { environment } from '../environments/environment';
import { ApiUrlInterceptor } from './_helpers/api-url.interceptor';
import { UserComponent } from './user/user.component';
import {NgxPaginationModule} from 'ngx-pagination';

 
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    AnalitycsComponent,
    LoginComponent,
    ClassComponent,
    StudentComponent,
    TeacherComponent,
    ToolComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule, 
    NgbModule.forRoot(),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
    }) // ToastrModule added
  ],
  providers: [
    { provide: API_URL, useValue: environment.apiUrl },
    { provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true, deps: [API_URL] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
