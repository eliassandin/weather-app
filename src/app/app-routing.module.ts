import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityViewComponent } from './city-view/city-view.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: "city/:id", component: CityViewComponent, },
  {path: "", component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
