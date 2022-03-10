import { Component, OnInit } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { OpenWeatherMapService, OneCallData, WeatherData, WeatherDescription, GeoData } from '../open-weather-map.service';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Output() sendGeoData: EventEmitter<GeoData> = new EventEmitter();
  submitted = false;

  lund : GeoData = {
  	"name":"Lund",
  	"lat":55.7029296,
  	"lon":13.1929449,
  	"country":"SE"
  }

  sthlm : GeoData = {
  	"name":"Stockholm",
  	"lat":59.3251172,
  	"lon":18.0710935,
  	"country":"SE"
  }
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
  
  model = {name: 'hej'};

  private url = 'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=1766139ca73a00ae488fad64f5a917eb';

  posts : any;

  private city = "";

  configUrl = 'assets/config.json';

  locationList : GeoData[] = [];

  links  = [this.url, this.url, this.url];
  constructor(private http: HttpClient, private openWeather: OpenWeatherMapService) {

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
  capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  unixToLocal(dt: number): string {
    var d = new Date(dt*1000);
    return `${d.getDay()} - ${d.getHours()}`;
  }
  showInfo(data : GeoData){
    console.log(data.lon + ' '+ data.lat);
    this.sendGeoData.emit(data);
  }
  getPosts() {
	return this.http.get(this.url);
  }
  
update() {
    this.openWeather.requestWeatherData(this.lund).subscribe(
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
  
  ngOnInit(): void {
    this.update();
  }
  


  showFormControls(form: any) {
    this.city = form && form.controls['name'] &&
    form.controls['name'].value;
  }


  
  onSubmit(){
  
    this.openWeather.requestGeoData(this.city).subscribe(
      (response: GeoData[]) => {
      	const res = response;
        console.log(res);
        console.log("HEEEJ");
        this.locationList = response;
      }
    );
  }

}
