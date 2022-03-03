import { Component, OnInit } from '@angular/core';
import { OneCallData, OpenWeatherMapService } from '../open-weather-map.service';
import { PrognosisTableDataSource } from '../prognosis-table/prognosis-table-datasource';

@Component({
  selector: 'app-city-view',
  templateUrl: './city-view.component.html',
  styleUrls: ['./city-view.component.css']
})
export class CityViewComponent implements OnInit {

  constructor(private openWeather: OpenWeatherMapService) { }

  dailyTableObject = new PrognosisTableDataSource();

  ngOnInit(): void {
    this.openWeather.requestWeatherData().subscribe((response: OneCallData) => {
      this.dailyTableObject.data = response.daily;
    });
  }
}
