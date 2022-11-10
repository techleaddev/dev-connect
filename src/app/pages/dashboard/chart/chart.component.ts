import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
} from 'ng-apexcharts';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponents implements OnInit {
  chartSeries:ApexNonAxisChartSeries=[40,32,28,55];
  chartDetail : ApexChart={
    type:'pie',
    toolbar:{
      show:true
    }
  }
  constructor() {
   
  }

  ngOnInit(): void {}
}
