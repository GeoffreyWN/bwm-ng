import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../shared/rental.service';
import { Rental } from '../shared/rental.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'bwm-rental-search',
  templateUrl: './rental-search.component.html',
  styleUrls: ['./rental-search.component.css']
})
export class RentalSearchComponent implements OnInit {

  city: string;
  rentals: Rental[] = [];
  errors: HttpErrorResponse[] = []

  constructor(private route: ActivatedRoute, private rentalService: RentalService) { }

  ngOnInit() {
    this.route.params.subscribe((params)=>{
      this.city = params['city'];
      this.getRentals()
    })
  }

  getRentals() {
    this.errors = [];
    this.rentals = [];

    this.rentalService.getRentalsByCity(this.city).subscribe(
      (data: Rental[])=>{ 
        this.rentals = data
      },
      (errorResponse: HttpErrorResponse)=>{
        this.errors = errorResponse.error.errors;
      }
    );
  }

}
