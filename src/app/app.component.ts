import { Component } from '@angular/core';
import { AppDataService } from './app-data.service';
import { GeoData } from './open-weather-map.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private appData: AppDataService) {}

  setData(newItem: GeoData) {
    this.appData.setDisplayedLocation(newItem);
  }
}
