import { Component } from '@angular/core';
import { GeoData } from './open-weather-map.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weather-app';
  data : GeoData = {
  	name: 'London',
  	lat: 1,
  	lon : 2,
  	country: 'GB'
  };
  weatherData = "Hello world";

  setData(newItem: GeoData) {
  	console.log(newItem);
    this.data = newItem;
  }

  ngOnInit() {
    this.weatherData = "Robin and Martin were here!"
  }
}
