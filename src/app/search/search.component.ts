import { Component, OnInit } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { OpenWeatherMapService, OneCallData, WeatherData, WeatherDescription, GeoData} from '../open-weather-map.service';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  submitted = false;

  model = {name: 'hej'};

  private url = 'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=1766139ca73a00ae488fad64f5a917eb';

  private baseUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=';

  private end = '&limit=5&appid=1766139ca73a00ae488fad64f5a917eb';
  
  posts : any;

  private city = "";

  configUrl = 'assets/config.json';

  locationList : GeoData[] = [];
  links  = [this.url, this.url, this.url];
  constructor(private http: HttpClient, private openWeather: OpenWeatherMapService) {

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
  let url = this.baseUrl + this.city + this.end;
  this.openWeather.requestWeatherData(url).subscribe(
      (response: GeoData[]) => {
      	const res = response.map(e => [e.name, e.country, e.lat, e.lon]);
        this.locationList = response;
      }
    );
  }

}
