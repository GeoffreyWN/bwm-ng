import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import { Booking } from './booking.model';

@Injectable()
export class BookingService {

  //url = 'localhost:3001/api/v1/rentals' use a proxy to avoid cors errors
  url = 'http://localhost:3001/api/v1/rentals'

  constructor(private http: HttpClient) { }

  public createBooking(booking: Booking): Observable<any> {
    return this.http.post('http://localhost:3001/api/v1/bookings', booking)
  }


}



