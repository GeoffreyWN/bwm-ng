import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes} from '@angular/router'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './shared/token.interceptor';



import { AuthService } from './shared/auth.service';
import { AuthGuard } from './shared/auth.guard';


import { LoginComponent } from './/login/login.component';
import { RegisterComponent } from './/register/register.component';
import { AuthComponent } from './auth.component';


const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
    { path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},

] 


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthComponent
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
})
export class AuthModule { }
