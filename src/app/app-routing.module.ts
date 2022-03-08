import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityViewComponent } from './city-view/city-view.component';
import { WeatherViewComponent } from './weather-view/weather-view.component';

const routes: Routes = [
  {path: "city", component: CityViewComponent},
  {path: "", component: WeatherViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
