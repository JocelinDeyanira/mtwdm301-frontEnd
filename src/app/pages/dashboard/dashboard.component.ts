import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { MultiDataSet, Label, SingleDataSet } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})

export class DashboardComponent {

  clientList:any ={}
  selectedTop: any;
  categories = [
    { key: "1", value: "Clientes" },
    { key: "2", value: "Productos" },
    { key: "3", value: "Categorías" },
    { key: "4", value: "Empleados" }
  ]
  colors = ["success","info", "warning","success","info"];
  order = ["1","2","3","4","5"];


  doughnutChartLabels: Label[]; // = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  doughnutChartData: SingleDataSet[];
  
  // doughnutChartLabels: arrayLabels; //Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  // doughnutChartData:
  //MultiDataSet = [
  //   [350, 450, 100],
  //   [50, 150, 120],
  //   [250, 130, 70],
  // ];
  doughnutChartType: ChartType = 'doughnut';

  //Gráfica de barras
  barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  barChartLabels: Label[];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [pluginDataLabels]; 
  barChartData: ChartDataSets[];

  constructor(private http:HttpClient) 
  {
    this.http.get('http://localhost/API.Northwind/v1/Dashboard/Northwind/Top5/1')
    .subscribe((result:any) => {
      
      this.clientList = result["item2"];
      this.doughnutChartLabels = result["item1"];
      this.doughnutChartData = result["item2"];
    })

    //La serie historica por POST
    let postData = {
      dimension: "[Dim Cliente].[Dim Cliente Nombre]",
      item: "Côte de Blaye"
    }

    this.http.post('http://localhost:61549/v1/Dashboard/Northwind/SerieHistoricaPost', 
      postData
    ).subscribe(data => {
      console.log(data);
    })

    this.http.post('http://localhost/API.Northwind/v1/Dashboard/Northwind/SerieHistorica/1/0', '', {})
    .subscribe((result:any) => {
      //this.clientList = result
      console.log(result.months);
      console.log(result.values);
      this.barChartLabels = result.months;
      this.barChartData = [{ data: result.values, label: "Historico de Clientes"}];
    })
  }

  public selectTop5(option) {
      console.log(option);
      this.http.get('http://localhost/API.Northwind/v1/Dashboard/Northwind/Top5/' + option)
    .subscribe((result:any) => {
      //this.clientList = result;
      this.doughnutChartLabels = result["item1"];
      this.doughnutChartData = result["item2"];
    })

    var titulo = "";
      switch (option) {
        case "1":
          titulo = "Clientes";
        break
        case "2":
          titulo = "Productos";
        break
        case "3":
            titulo = "Categorías";
        break
        case "4":
          titulo = "Empleados";
        break
      }

    this.http.post('http://localhost/API.Northwind/v1/Dashboard/Northwind/SerieHistorica/' + option + '/0', '', {})
    .subscribe((result:any) => {
      //this.clientList = result
      console.log(result.months);
      console.log(result.values);
      this.barChartLabels = result.months;
      this.barChartData = [{ data: result.values, label: "Historico de " + titulo}];
    })
  }

  public selectedItem(dimension, filtro) {

    if (filtro == "Meat/Poultry") {
      filtro = "Meat"
    }
    console.log(dimension, filtro);
    this.http.post('http://localhost/API.Northwind/v1/Dashboard/Northwind/SerieHistorica/' + dimension + '/' + filtro, '', {})
    .subscribe((result:any) => {
      //this.clientList = result
      var titulo = "";
      switch (dimension) {
        case "1":
          titulo = "Clientes";
        break
        case "2":
          titulo = "Productos";
        break
        case "3":
          titulo = "Categorías";
        break
        case "4":
          titulo = "Empleados";
        break
      }
      console.log(result.months);
      console.log(result.values);
      if (filtro == "Meat") {
        filtro = "Meat/Poultry"
      }
      this.barChartLabels = result.months;
      this.barChartData = [{ data: result.values, label: "Historico de " + titulo + ", filtrando por: " + filtro}];
    })
  }
}
