import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  http = inject(HttpClient);
  apiURL = 'https://fakestoreapi.com';

  constructor() {}

  getAllData() {
    return this.http.get(`${this.apiURL}/products`);
  }

  fetchDataEveryMinute() {
    return interval(30000).pipe(switchMap(() => this.getAllData()));
  }
}
