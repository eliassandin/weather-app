import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { GeoData } from '../open-weather-map.service';
import { AppDataService } from '../app-data.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnChanges {
  location: GeoData;

  constructor(private appData: AppDataService) {
    this.location = appData.getDisplayedLocation();

    this.appData.locationUpdated.subscribe(() => {
      console.log("HomeComponent received locationUpdated!")
      this.location = this.appData.getDisplayedLocation();
    })
  }

  getLocation(): GeoData { return this.location; }

  ngOnChanges(changes: SimpleChanges): void {
    this.location = this.appData.getDisplayedLocation();
  }
}
