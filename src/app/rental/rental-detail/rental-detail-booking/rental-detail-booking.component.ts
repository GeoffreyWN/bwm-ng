import { Component, OnInit, Input } from '@angular/core';
// import { Rental } from '../../shared/rental.model';

@Component({
  selector: 'bwm-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.css']
})
export class RentalDetailBookingComponent implements OnInit {
  // @Input() rental : Rental

  @Input() price: number

  daterange: any = {};

  options: any = {
      locale: { format: 'YYYY-MM-DD' },
      alwaysShowCalendars: false,
      open: 'left'
  };
  constructor() { }

  ngOnInit() {
  }

  

  public selectedDate(value: any, datepicker?: any) {
      console.log(value);

      datepicker.start = value.start;
      datepicker.end = value.end;

      this.daterange.start = value.start;
      this.daterange.end = value.end;
      this.daterange.label = value.label;
  }

}
