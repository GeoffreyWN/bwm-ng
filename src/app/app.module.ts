import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router'
import {  HttpClientModule } from '@angular/common/http'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastModule} from 'ng2-toastr/ng2-toastr';



import { RentalModule } from './rental/rental.module';
import { AuthModule } from './auth/auth.module';


import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { RentalComponent } from './rental/rental.component';


const routes: Routes = [
  { path:'', redirectTo:'/rentals', pathMatch: 'full'}
] 


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    RentalModule,
    AuthModule,
    NgbModule.forRoot(),
    ToastModule.forRoot()


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
