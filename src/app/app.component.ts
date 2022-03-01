import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weather-app';

  weatherData = "Hello world";

  ngOnInit() {
    this.weatherData = "Robin and Martin were here!"
  }
}
