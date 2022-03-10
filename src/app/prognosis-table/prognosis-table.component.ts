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
      this.table.dataSource = this.dataSource;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  getPrecipitation(weather: any): number {
    if (weather?.rain)
      return weather.rain["1h"]
    if (weather?.snow)
      return weather.snow["1h"]
    return 0
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

  getTemperatureStyle(temperature: number): string {
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
