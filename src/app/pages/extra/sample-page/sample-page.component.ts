import { Component, OnInit, inject } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-sample-page',
  templateUrl: './sample-page.component.html',
  styleUrls: ['./sample-page.component.css'],
})
export class AppSamplePageComponent implements OnInit {
  dataService = inject(DataService);
  displayedColumns: string[] = ['Image', 'Category', 'Price'];

  dataSource = [];

  constructor() {}

  ngOnInit(): void {
    this.getInitialData();
    this.getAllData();
  }

  getInitialData() {
    this.dataService.getAllData().subscribe((res: any) => {
      console.log('Res Initial Data', res);
      this.dataSource = res;
    });
  }

  getAllData() {
    this.dataService.fetchDataEveryMinute().subscribe((res: any) => {
      console.log('Res', res);
      this.dataSource = res;
    });
  }
}
