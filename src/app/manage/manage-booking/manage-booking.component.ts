import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { BookingService } from '../../booking/shared/booking.service';
import { Booking } from '../../booking/shared/booking.model';



@Component({
  selector: 'bwm-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.css']
})
export class ManageBookingComponent implements OnInit {

  bookings: Booking[];
  errors: any[] = [];

  constructor( private bookingService: BookingService) {}

  ngOnInit() {
    this.bookingService.getUserBookings().subscribe(
      (bookings: Booking[])=>{
        this.bookings = bookings
      },
      ()=>{}
    )
  }

}
