import { Component } from '@angular/core';
import { OpenWeatherMapService, GeoData } from '../open-weather-map.service';
import { AppDataService } from '../app-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  submitted = false;

  model = {name: 'hej'};

  constructor(
    private appData: AppDataService,
    private openWeather: OpenWeatherMapService,
    private router: Router,
  ) { }
  
  showFormControls(form: any) {
    return form && form.controls['name'] &&
    form.controls['name'].value;
  }
  
  onSubmit(){
    if (this.appData.getLocation(this.model.name)) {
      this.router.navigate([`/city/${this.model.name}`]);
    } else {
      this.openWeather.requestGeoData(this.model.name).subscribe(
        (response: GeoData[]) => {
          var result: GeoData = response[0];
          this.appData.cacheLocationData(result);
          this.router.navigate([`/city/${result.name}`]);
        }
      )
    }
  }
}
