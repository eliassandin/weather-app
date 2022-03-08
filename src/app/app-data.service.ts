import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {
  defaultLocation: LocationData = {
    name: "Lund",
    country: "Sweden",
    latitude: 55.703889,
    longitude: 13.195,
  };
  displayedLocation: LocationData;

  constructor() {
    this.displayedLocation = this.defaultLocation;
  }

  getDisplayedLocation(): LocationData {
    return this.displayedLocation;
  }

  getLocationOrDefault(location: string): LocationData {
    return this.defaultLocation;
  } 
}

export interface LocationData {
  name: string,
  country: string,
  latitude: number,
  longitude: number
};
