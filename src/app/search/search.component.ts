import { Component, OnInit } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { OpenWeatherMapService, OneCallData, WeatherData, WeatherDescription, GeoData } from '../open-weather-map.service';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output() sendGeoData: EventEmitter<GeoData> = new EventEmitter();
  submitted = false;

  model = {name: 'Ex.Lund'};

  private city = "";

  configUrl = 'assets/config.json';

  locationList : GeoData[] = [];

  constructor(private openWeather: OpenWeatherMapService) {}

  showInfo(data : GeoData){
    console.log("Emitting sendGeoData")
    console.log(data.lon + ' '+ data.lat);
    this.sendGeoData.emit(data);
    this.locationList = [];
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
        this.locationList = response;
      }
    );
  }

}
