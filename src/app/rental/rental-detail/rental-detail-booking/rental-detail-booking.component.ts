import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { Booking } from '../../../booking/shared/booking.model';
import { HelperService } from '../../../common/service/helper.service';
import * as moment from 'moment';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DaterangePickerComponent } from 'ng2-daterangepicker';



import { Rental } from '../../shared/rental.model';
import { BookingService } from '../../../booking/shared/booking.service';
// import { Rental } from '../../shared/rental.model';

@Component({
  selector: 'bwm-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.css']
})
export class RentalDetailBookingComponent implements OnInit {
  // @Input() rental : Rental

  // @Input() price: number
  // @Input() bookings: Booking[]
  @Input() rental: Rental
  @ViewChild(DaterangePickerComponent)
    private picker: DaterangePickerComponent;

  newBooking: Booking;
  errors: any[] = [];

  modalRef: any;

  daterange: any = {};
  bookedOutDates: any[] = [];

  options: any = {
      locale: { format: Booking.DATE_FORMAT },
      alwaysShowCalendars: false,
      open: 'left',
      autoUpdateInput: false, 
      isInvalidDate: this.checkForInvalidDates.bind(this) // the bind tranfers context to the calendar logic
  };
  constructor(private helperService: HelperService, private modalService: NgbModal, private bookingService: BookingService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
 }

  ngOnInit() {
    this.newBooking = new Booking();
    this.getBookedOutDates()
  }

  private checkForInvalidDates(date) {
    return this.bookedOutDates.includes(this.helperService.formatBookingDate(date)) || date.diff(moment(), 'days') < 0;
  }

  private getBookedOutDates() {
    const bookings: Booking[] = this.rental.bookings
    if (bookings && bookings.length > 0) {
      bookings.forEach((booking: Booking)=>{
        const dateRange = this.helperService.getBookedRangeOfDates(booking.startAt, booking.endAt );
        this.bookedOutDates.push(...dateRange)
        // debugger;
      });
    }
  }

  private addBookedDates(bookingData: any) {
    const dateRange = this.helperService.getBookedRangeOfDates(bookingData.startAt, bookingData.endAt)
    this.bookedOutDates.push(...dateRange)
  }

  private resetDatePicker() {
    this.picker.datePicker.setStartDate(moment());
    this.picker.datePicker.setEndDate(moment());
    this.picker.datePicker.element.val('');
  }


  openConfirmModal(content) {
    this.errors = []
    this.modalRef = this.modalService.open(content)
    // console.log(this.newBooking);
  }

  CreateBooking() {
    this.newBooking.rental = this.rental
    this.bookingService.createBooking(this.newBooking).subscribe(
      (bookingData)=>{
        this.addBookedDates(bookingData)
        this.newBooking = new Booking();
        this.modalRef.close();
        this.resetDatePicker()
        this.toastr.success('Success!! Booking created!', 'Success!');
      },
      (errorResponse)=>{
        this.errors = errorResponse.error.errors;
      }
    );
  }

  public selectedDate(value: any, datepicker?: any) {
      this.options.autoUpdateInput = true;
      this.newBooking.startAt = this.helperService.formatBookingDate(value.start);
      this.newBooking.endAt = this.helperService.formatBookingDate(value.end);
      this.newBooking.days = -(value.start.diff(value.end, 'days'))
      this.newBooking.totalPrice = this.newBooking.days * this.rental.dailyRate

  }

}
