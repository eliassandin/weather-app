import { Injectable } from '@angular/core';
import { GeoData } from './open-weather-map.service';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {
  defaultLocation: GeoData = {
    name: "Lund",
    country: "Sweden",
    lat: 55.703889,
    lon: 13.195,
  };
  displayedLocation: GeoData;

  locationCache: Map<string, GeoData> = new Map();

  constructor() {
    this.displayedLocation = this.defaultLocation;
  }

  cacheLocationData(data: GeoData) {
    if(!this.locationCache.has(data.name))
      this.locationCache.set(data.name, data);
  }

  getDisplayedLocation(): GeoData {
    return this.displayedLocation;
  }

  getLocation(name: string): GeoData | undefined {
    console.log(this.locationCache.keys)
    return this.locationCache.get(name);
  }
}
