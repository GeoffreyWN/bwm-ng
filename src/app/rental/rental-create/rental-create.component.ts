import { Component, OnInit } from '@angular/core';
import { Rental } from '../shared/rental.model';
import { RentalService } from '../shared/rental.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'bwm-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.css']
})
export class RentalCreateComponent implements OnInit {
  newRental: Rental;
  rentalCategories = Rental.CATEGORIES;

  rentals: Rental[] = [];
  errors: HttpErrorResponse[] = []

  constructor(private rentalService: RentalService, private router: Router) { }

  ngOnInit() {
    this.newRental = new Rental()
    this.newRental.shared = false;
  }

  handleImageChange() {
    this.newRental.image = "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/10/image.jpeg"
  }

  createRental() {
    this.rentalService.createRental(this.newRental).subscribe(
      (rental: Rental)=>{
        this.router.navigate([`/rentals/${rental._id}`])
      },
      (errorResponse: HttpErrorResponse)=>{
        this.errors = errorResponse.error.errors;
      }
    );
  }

}
