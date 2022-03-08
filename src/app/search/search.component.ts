import { Component, OnInit } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { OpenWeatherMapService, OneCallData, WeatherData, WeatherDescription, GeoData } from '../open-weather-map.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() sendGeoData: EventEmitter<GeoData> = new EventEmitter();
  submitted = false;

  model = {name: 'hej'};

  private url = 'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=1766139ca73a00ae488fad64f5a917eb';

  posts : any;

  private city = "";

  configUrl = 'assets/config.json';

  locationList : GeoData[] = [];

  links  = [this.url, this.url, this.url];
  constructor(private http: HttpClient, private openWeather: OpenWeatherMapService) {

  }
  showInfo(data : GeoData){
    console.log(data.lon + ' '+ data.lat);
    this.sendGeoData.emit(data);
  }
  getPosts() {
	return this.http.get(this.url);
  }
  ngOnInit(): void {
  
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
