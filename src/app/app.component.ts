import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  // clientList:any ={}

  // doughnutChartLabels: Label[]; // = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  // doughnutChartData: SingleDataSet[];
  
  // // doughnutChartLabels: arrayLabels; //Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  // // doughnutChartData:
  // //MultiDataSet = [
  // //   [350, 450, 100],
  // //   [50, 150, 120],
  // //   [250, 130, 70],
  // // ];
  // doughnutChartType: ChartType = 'doughnut';

  // constructor(private http:HttpClient) 
  // {
  //   this.http.get('http://localhost/API.Northwind/v1/Dashboard/Northwind/Top5')
  //   .subscribe((result:any) => {
  //     this.clientList = result;
  //     this.doughnutChartLabels = result["item1"];
  //     this.doughnutChartData = result["item2"];
  //   })
  // }

  title = 'ProyectoFinal';
}
