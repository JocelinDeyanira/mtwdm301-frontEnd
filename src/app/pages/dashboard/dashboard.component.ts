import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { MultiDataSet, Label, SingleDataSet, Color, BaseChartDirective  } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})

export class DashboardComponent {

  @ViewChild('selectCategory', {static: false}) selectCategory: any;

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

  //CHART DOUGHNUT
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

  //MULTISELECT
  itemList: any = [];
  selectedItems: any = [];
  settings: any = {};
  
  
  combos: any = [];
  elementos: any = [];
  array: any = [];
  obj:any ={}

  //LINE CHART (COMPARATIVA)
  lineChartData: ChartDataSets[] = [];
  lineChartLabels: Label[] = [];

  lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };

  lineChartLegend = true;
  lineChartType = 'line';

  OnInit() {
    
  }
  
  constructor(private http:HttpClient) 
  {
    this.selectedItems = [
      { "id": 1, "itemName": "Alfreds Futterkiste" },
     ];
  
    this.http.get('http://104.40.0.39/API.Northwind/v1/Dashboard/Northwind/top5/1')
    .subscribe((result:any) => {
      
      this.clientList = result["item2"];
      this.doughnutChartLabels = result["item1"];
      this.doughnutChartData = result["item2"];
    })

    //La serie historica por POST
    let postData = {
      // dimension: "[Dim Cliente].[Dim Cliente Nombre]",
      dimension: "1",
      item: "0"
    }

    this.http.post('http://104.40.0.39/API.Northwind/v1/Dashboard/Northwind/SerieHistoricaPost', 
      postData
    ).subscribe((data:any) => {
      console.log(data);
      this.barChartLabels = data.months;
      this.barChartData = [{ data: data.values, label: "Historico de Clientes"}];
    })

    // this.http.post('http://localhost/API.Northwind/v1/Dashboard/Northwind/SerieHistorica/1/0', '', {})
    // .subscribe((result:any) => {
    //   //this.clientList = result
    //   console.log(result.months);
    //   console.log(result.values);
    //   this.barChartLabels = result.months;
    //   this.barChartData = [{ data: result.values, label: "Historico de Clientes"}];
    // })

    this.combos = [];
    this.itemList = [];

    this.http.post('http://104.40.0.39/API.Northwind/v1/Dashboard/Northwind/Combos', 
      postData
    ).subscribe((data:any) => {
      // console.log("resultado de combos");
      // console.log(data);

      for (var key in data) {
        this.combos.push(data[key])
    }

      // console.log(this.combos);

      
      for (var i = 0, len = this.combos.length; i < len; i++) {

        var elemento = "";
        elemento = "{ \"id\": " + (i + 1) + ", \"itemName\": \"" + this.combos[i] + "\"" +  "}";
        // console.log(this.combos[i]);
        // console.log(elemento);

        this.itemList.push(JSON.parse(elemento));
      }

    })

    this.settings = {
      text: "Select Something",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      classes: "myclass custom-class"
  };

  //La serie historica por POST
  let postTablaComparativa = {
    dimension: "1",
    item: "Alfreds Futterkiste"
  }
  
  this.http.post('http://104.40.0.39/API.Northwind/v1/Dashboard/Northwind/TablaComparativa', 
      postTablaComparativa
    ).subscribe((data:any) => {
      
        this.lineChartLabels = data.fecha;

        this.lineChartData = [{ data: data.valor, label: "Alfreds Futterkiste" }];
        
    });

  }

  public onItemSelect(item: any) {
    this.createLineChart();
  }
  
  public OnItemDeSelect(item: any) {
    this.createLineChart();
  }
  
  public onSelectAll(items: any) {
    this.createLineChart();
  }
  public onDeSelectAll(items: any) {
    this.createLineChart();
  }

public createLineChart() {

  this.array = [];
  this.lineChartData = [];
  this.lineChartLabels = [];

  for (let index = 0; index < this.selectedItems.length; index++) {
    
    let postTablaComparativa = {
      dimension: this.selectCategory.nativeElement.value,
      item: this.selectedItems[index].itemName
  }

  //console.log(postTablaComparativa);
    this.http.post('http://104.40.0.39/API.Northwind/v1/Dashboard/Northwind/TablaComparativa', 
      postTablaComparativa
    ).subscribe((data:any) => {
      

      this.lineChartLabels = data.fecha;  

      this.array.push({ data: data.valor, label: postTablaComparativa.item });   
        
    });
  }
    //this.lineChartLabels += this.obj;
    this.lineChartData = this.array;
}

  public selectTop5(option) {

    this.lineChartData = [];
    this.lineChartLabels = [];
    this.selectedItems = [];

      console.log(option);
      this.http.get('http://104.40.0.39/API.Northwind/v1/Dashboard/Northwind/Top5/' + option)
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

    //La serie historica por POST
    let postData = {
      dimension: option,
      item: "0"
    }

    this.http.post('http://104.40.0.39/API.Northwind/v1/Dashboard/Northwind/SerieHistoricaPost', 
      postData
    ).subscribe((data:any) => {
      console.log(data);
      this.barChartLabels = data.months;
      this.barChartData = [{ data: data.values, label: "Historico de " + titulo}];
    })

    this.combos = [];
    this.itemList = [];

    this.http.post('http://104.40.0.39/API.Northwind/v1/Dashboard/Northwind/Combos', 
      postData
    ).subscribe((data:any) => {
      // console.log("resultado de combos");
      // console.log(data);

      for (var key in data) {
        this.combos.push(data[key])
    }

      // console.log(this.combos);

      
      for (var i = 0, len = this.combos.length; i < len; i++) {

        var elemento = "";
        elemento = "{ \"id\": " + (i + 1) + ", \"itemName\": \"" + this.combos[i] + "\"" +  "}";
        // console.log(this.combos[i]);
        // console.log(elemento);

        this.itemList.push(JSON.parse(elemento));
      }

    })
    

    // this.http.post('http://localhost/API.Northwind/v1/Dashboard/Northwind/SerieHistorica/' + option + '/0', '', {})
    // .subscribe((result:any) => {
    //   //this.clientList = result
    //   console.log(result.months);
    //   console.log(result.values);
    //   this.barChartLabels = result.months;
    //   this.barChartData = [{ data: result.values, label: "Historico de " + titulo}];
    // })
  }

  public selectedItem(dimension, filtro) {

    if (filtro == "Meat/Poultry") {
      filtro = "Meat"
    }
    console.log(dimension, filtro);

    //La serie historica por POST
    let postData = {
      dimension: dimension,
      item: filtro
    }

    this.http.post('http://104.40.0.39/API.Northwind/v1/Dashboard/Northwind/SerieHistoricaPost', 
      postData
    ).subscribe((data:any) => {
      console.log(data);

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
      if (filtro == "Meat") {
        filtro = "Meat/Poultry"
      }
      this.barChartLabels = data.months;
      this.barChartData = [{ data: data.values, label: "Historico de " + titulo + ", filtrando por: " + filtro}];
    })

    // this.http.post('http://localhost/API.Northwind/v1/Dashboard/Northwind/SerieHistorica/' + dimension + '/' + filtro, '', {})
    // .subscribe((result:any) => {
    //   //this.clientList = result
    //   var titulo = "";
    //   switch (dimension) {
    //     case "1":
    //       titulo = "Clientes";
    //     break
    //     case "2":
    //       titulo = "Productos";
    //     break
    //     case "3":
    //       titulo = "Categorías";
    //     break
    //     case "4":
    //       titulo = "Empleados";
    //     break
    //   }
    //   console.log(result.months);
    //   console.log(result.values);
    //   if (filtro == "Meat") {
    //     filtro = "Meat/Poultry"
    //   }
    //   this.barChartLabels = result.months;
    //   this.barChartData = [{ data: result.values, label: "Historico de " + titulo + ", filtrando por: " + filtro}];
    // })
  }
}
