import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router'
import { NgPipesModule } from 'ngx-pipes';

import { RentalService } from './shared/rental.service';

import { RentalComponent } from "./rental.component";
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';

import { UppercasePipe } from '../common/pipes/uppercase.pipe';



const routes: Routes = [
    { path:'rentals', component: RentalComponent, children:[
        { path: '', component:RentalListComponent },
        { path: ':rentalId', component:RentalDetailComponent}
    ]}
  ]


@NgModule({
    declarations: [
    RentalComponent,
    RentalListComponent,
    RentalListItemComponent,
    RentalDetailComponent,
    UppercasePipe
    ],
    imports: [ 
        CommonModule,
        RouterModule.forChild(routes),
        NgPipesModule
 ],
    exports: [],
    providers: [RentalService],
})
export class RentalModule {

}