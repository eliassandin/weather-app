import { Component, OnInit } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { OpenWeatherMapService, OneCallData, WeatherData, WeatherDescription } from '../open-weather-map.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  submitted = false;
  model = {name: 'hej'};
  private url = 'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=1766139ca73a00ae488fad64f5a917eb';
  posts : any;
  configUrl = 'assets/config.json';
  constructor(private http: HttpClient, private openWeather: OpenWeatherMapService) { }
  
  getPosts() {
	return this.http.get(this.url);
  }
  ngOnInit(): void {
  
  }
  showFormControls(form: any) {
    return form && form.controls['name'] &&
    form.controls['name'].value;
  }
  
  onSubmit(){
  const p = this.getPosts();
  	console.log(p);
  }

}
