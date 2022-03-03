import { Component, OnInit } from '@angular/core';
import { OpenWeatherMapService, OneCallData, WeatherData, WeatherDescription } from '../open-weather-map.service';

@Component({
  selector: 'app-weather-view',
  templateUrl: './weather-view.component.html',
  styleUrls: ['./weather-view.component.css']
})
export class WeatherViewComponent implements OnInit {

  constructor(private openWeather: OpenWeatherMapService) { }

  todStyle: string = "day";
  temperatureStyle: string = "temp";

  icon: string = "01d";
  description: string = "No weather";

  sunrise: number = 0;
  sunset: number = 0;

  temperature: number = 0;
  precipitation: number = 0;
  wind_speed: number = 0;

  hourly: WeatherData[] = [];

  displayColumns: string[] = [
    "time",
    "icon",
    "desc",
    "temp",
    "precipitation",
    "humidity",
    "wind"
  ];

  debug: string = "";

  capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  unixToLocal(dt: number): string {
    var d = new Date(dt*1000);
    return `${d.getDay()} - ${d.getHours()}`;
  }

  isRainy(weather: WeatherData): boolean {
    return weather.rain !== undefined || weather.snow !== undefined;
  }

  getTimeOfDayStyle(dt: number): string {
    var ctime = new Date(dt*1000).getHours();
    var stime = new Date(this.sunrise*1000).getHours();
    var etime = new Date(this.sunset*1000).getHours();
    return stime < ctime && ctime <= etime ?
      "day" : "night";
  }

  getTemperatureStyle(temperature: number): string {
    return temperature > 0 ? "hot" : "cold";
  }

  ngOnInit(): void {
    this.openWeather.requestWeatherData().subscribe(
      (response: OneCallData) => {
        this.debug = JSON.stringify(response);

        var c = response.current;
        var cw = c.weather[0];

        this.sunrise = c.sunrise;
        this.sunset = c.sunset;

        this.todStyle = this.getTimeOfDayStyle(c.dt);

        this.icon = cw.icon;
        this.description = this.capitalize(cw.description);

        this.temperature = response.current.temp;
        this.temperatureStyle = this.temperature > 0 ?
        "" : "cold";

        if (this.isRainy(c)) {
          var isSnow = 600 <= cw.id && cw.id <= 699;
          this.precipitation = (isSnow ?
            c.snow["1h"] :
            c.rain["1h"]) || 0;
        }
        this.wind_speed = c.wind_speed;

        this.hourly = response.hourly;
      }
    );
  }
}
