import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { interval } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  http = inject(HttpClient);
  apiURL = 'https://fakestoreapi.com';
  headers: HttpHeaders = new HttpHeaders(); // Initialize headers

  constructor() {
    console.log('Initialize Service Filea');

    this.fetchLatestHeadersAndCookies();
    // Fetch headers and cookies immediately upon initialization
  }

  // getAllData() {
  //   return this.http.get(`${this.apiURL}/products`);
  // }

  // fetchDataEveryMinute() {
  //   return interval(30000).pipe(switchMap(() => this.getAllData()));
  // }

  // Method to fetch the latest headers and cookies from the third-party API
  fetchLatestHeadersAndCookies() {
    return this.http
      .get(`${this.apiURL}/products`, { observe: 'response' })
      .pipe(
        tap((response) => {
          // Assuming the response contains headers and cookies
          console.log('response of headers', response);

          this.headers = response.headers;
          // Optionally, extract cookies if needed
        })
      );
  }

  // Adjusted getAllData to use the stored headers
  getAllData() {
    return this.http.get(`${this.apiURL}/products`, { headers: this.headers });
  }

  fetchDataEveryMinute() {
    return interval(60000).pipe(switchMap(() => this.getAllData()));
  }

  // Schedule to fetch the latest headers and cookies every 30 minutes
  scheduleFetchHeadersAndCookies() {
    interval(1800000).subscribe(() => this.fetchLatestHeadersAndCookies());
  }
}
