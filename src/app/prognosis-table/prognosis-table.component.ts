import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { PrognosisTableDataSource, PrognosisTableItem } from './prognosis-table-datasource';

@Component({
  selector: 'app-prognosis-table',
  templateUrl: './prognosis-table.component.html',
  styleUrls: ['./prognosis-table.component.css']
})
export class PrognosisTableComponent implements AfterViewInit, OnChanges {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<PrognosisTableItem>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  @Input() displayedColumns: string[] = [
    "time",
    "icon",
    "desc",
    "temp",
    "precipitation",
    "humidity",
    "wind"
  ];
  @Input() dataSource = new PrognosisTableDataSource();

  @Input() pageOptions: number[] = [
    6, 12, 24, 48
  ]
  @Input() defaultPageOption: number = 24;

  ngOnChanges(changes: SimpleChanges): void {
      console.log("Ennter OnChange");
      if(this.table){
        this.dataSource.paginator = this.paginator;
        console.log("OnChange prognosis", changes);
        console.log("OnChange datasource ", this.dataSource);
        this.table.dataSource = this.dataSource;
      }
      throw undefined;
  }

  ngAfterViewInit(): void {
    console.log("AfterViewInit 1", this.table.dataSource);
    console.log("AfterViewInit 2", this.dataSource);
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    console.log("AfterViewInit 3", this.table.dataSource);
    console.log("AfterViewInit 4", this.dataSource);
  }

  getPrecipitation(weather: any): number {
    if (weather?.rain)
      if(weather.rain["1h"])
        return weather.rain["1h"]
      else
        return weather.rain
    if (weather?.snow)
      if(weather.snow["1h"])
        return weather.snow["1h"]
      else
        return weather.snow
    return 0
  }

  getTemperature(weather: any): string {
    if(!weather.temp.day)
      return `${weather.temp}`
    else
      return `${weather.temp.min} - ${weather.temp.max}`
  }

  getTimeOfDayStyle(dt: number): string {
    var ctime = new Date(dt*1000).getHours();
    var stime = new Date(this.dataSource.sunrise*1000).getHours();
    var etime = new Date(this.dataSource.sunset*1000).getHours();
    if (stime == etime)
      return "day";
    return stime < ctime && ctime <= etime ?
      "day" : "night";
  }

  getTemperatureStyle(temperature: any): string {
    if(temperature.day)
      return temperature.day > 0 ? "hot" : "cold";
    return temperature > 0 ? "hot" : "cold";
  }

  capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  unixToLocal(dt: number): string {
    var d = new Date(dt*1000);
    return `${d.getDate()} - ${d.getHours()}`;
  }
}
