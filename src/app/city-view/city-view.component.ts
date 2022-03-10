import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppDataService } from '../app-data.service';
import { GeoData, OneCallData, OpenWeatherMapService } from '../open-weather-map.service';
import { PrognosisTableDataSource } from '../prognosis-table/prognosis-table-datasource';

@Component({
  selector: 'app-city-view',
  templateUrl: './city-view.component.html',
  styleUrls: ['./city-view.component.css']
})
export class CityViewComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private appData: AppDataService,
    private openWeather: OpenWeatherMapService
  ) { }

  dailyTableObject = new PrognosisTableDataSource();

  displayedName: string = "";
  displayedLocation: GeoData | undefined;

  ngOnInit(): void {
    this.displayedName = this.route.snapshot.params["id"];
    this.openWeather.requestGeoData(this.displayedName).subscribe(
      (response: GeoData[]) => {
        this.displayedLocation = response[0];
        this.openWeather.requestWeatherData(
          this.displayedLocation
        ).subscribe((response: OneCallData) => {
          console.log(response);
          this.dailyTableObject.data = response.daily;
        });
      }
    )
  }
}
