import { Component, OnInit, inject } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-sample-page',
  templateUrl: './sample-page.component.html',
  styleUrls: ['./sample-page.component.css'],
})
export class AppSamplePageComponent implements OnInit {
  dataService = inject(DataService);
  displayedColumns: string[] = ['Index','Symbol', 'Open', 'High','Low','PreClose','Ltp','Change','%Change','Volume','Value','52W H','52W L','30D %Change'];

  dataSource = [];

  constructor() {}

  ngOnInit(): void {
    this.getInitialData();
    this.getAllData();
  }

  getInitialData() {
    this.dataService.getAllData().subscribe((res: any) => {
      console.log('Res Initial Data', res.data);
      this.dataSource = res.data;
    });
  }

  getAllData() {
    this.dataService.fetchDataEveryMinute().subscribe((res: any) => {
      console.log('Res getAllData', res.data);
      this.dataSource = res.data;
    });
  }
}
