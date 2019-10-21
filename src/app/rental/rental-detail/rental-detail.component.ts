import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Rental } from '../shared/rental.model';
import { RentalService } from '../shared/rental.service';

@Component({
  selector: 'bwm-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.css']
})
export class RentalDetailComponent implements OnInit {

  // currentId: String
  rental: Rental

  constructor(private route: ActivatedRoute, private rentalService: RentalService) { }

  ngOnInit() {
  //  this.rental = new Rental() helps avoid undefined error but in our case we handling with ngIf
    this.route.params.subscribe(
      (params)=>{
        // this.currentId = params['rentalId']
        this.getRental(params['rentalId'])

 //       console.log(params)
      }
    )
  }

  getRental(rentalId: string) {
    this.rentalService.getRentalById(rentalId).subscribe(
      (data: Rental)=>{
        this.rental = data
      });
  }

}
