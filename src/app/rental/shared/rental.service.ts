import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import { Rental } from './rental.model';

@Injectable()
export class RentalService {

  // private rentals: Rental[] = [{
  //     id: "1",
  //     title: "Central Apartment",
  //     city: "New York",
  //     street: "Times Sqaure",
  //     category: "apartment",
  //     image: "http://via.placeholder.com/350x250",
  //     bedrooms: 3,
  //     description: "Very nice apartment",
  //     dailyRate: 34,
  //     shared: false,
  //     createdAt: "24/12/2017"
  //   },
  //   {
  //     id: "2",
  //     title: "Central Apartment 2",
  //     city: "San Francisco",
  //     street: "Main street",
  //     category: "condo",
  //     image: "http://via.placeholder.com/350x250",
  //     bedrooms: 2,
  //     description: "Very nice apartment",
  //     dailyRate: 12,
  //     shared: true,
  //     createdAt: "24/12/2017"
  //   },
  //   {
  //     id: "3",
  //     title: "Central Apartment 3",
  //     city: "Bratislava",
  //     street: "Hlavna",
  //     category: "condo",
  //     image: "http://via.placeholder.com/350x250",
  //     bedrooms: 2,
  //     description: "Very nice apartment",
  //     dailyRate: 334,
  //     shared: true,
  //     createdAt: "24/12/2017"
  //   },
  //   {
  //     id: "4",
  //     title: "Central Apartment 4",
  //     city: "Berlin",
  //     street: "Haupt strasse",
  //     category: "house",
  //     image: "http://via.placeholder.com/350x250",
  //     bedrooms: 9,
  //     description: "Very nice apartment",
  //     dailyRate: 33,
  //     shared: true,
  //     createdAt: "24/12/2017"
  // }]

  //url = 'localhost:3001/api/v1/rentals' use a proxy to avoid cors errors
  url = 'http://localhost:3001/api/v1/rentals'

  constructor(private http: HttpClient) { }

  // // public getRentals(): any[] {
  // //   return this.rental;
  // // }

  // public getRentalById(rentalId: string): Observable<Rental> {
  //   return new Observable<Rental>((observer)=>{
  //     setTimeout(() => {
  //       const foundRental = this.rentals.find((rental)=>{
  //         return rental.id == rentalId
  //       })

  //       observer.next(foundRental);
  //     }, 500);
  //   })
  // }



  // public getRentals(): Observable<Rental[]> {

  //   const rentalObservable: Observable<Rental[]> = new Observable((observer)=>{
  //     setTimeout(() => {
  //       observer.next(this.rentals)
  //     }, 1000);

  //     // setTimeout(() => {
  //     //   observer.error("I was here waiting for you")
  //     // }, 2000);

  //     // setTimeout(() => {
  //     //   observer.complete()
  //     // }, 3000);

  //   })
  //   return rentalObservable
  // }
  public getRentalById(rentalId: string): Observable<any> {
    return this.http.get('http://localhost:3001/api/v1/rentals/' + rentalId)
  }

  public getRentals(): Observable<any>  { 
    return this.http.get(`${this.url}`)
  }

  public getRentalsByCity(city: string): Observable<any>  {
    return this.http.get(`${this.url}?city=${city}`)
  }

  public createRental(rental: Rental): Observable<any> {
    return this.http.post(`${this.url}`, rental)
  }

  public getUserRentals(): Observable<any> {
    return this.http.get(`${this.url}/manage`)
  }

  public deleteRental(rentalId: string): Observable<any> {
    return this.http.delete('http://localhost:3001/api/v1/rentals/' + rentalId)
  }

}



