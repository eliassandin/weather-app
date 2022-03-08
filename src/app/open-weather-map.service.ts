import { Injectable } from '@angular/core';
import { HttpClient, HttpParamsOptions } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherMapService {
  constructor(private http: HttpClient) {}

  requestWeatherData(url: string): Observable<any> {
    var params: any = {
      lat: "55.703889",
      lon: "13.195",
      units: "metric",
      appid: "",
    }
    var baseUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=1766139ca73a00ae488fad64f5a917eb';
    var options: any = {
      observe: "body",
      responseType: "json"
    };

    var v: string[] = Object.keys(params).map(
      param => `${param}=${params[param]}`
    )

    //var url = `${baseUrl}?${v.join("&")}`
    //console.log(url);
    console.log(options)
    return this.http.get<GeoData[]>(url, options);
  }
}

export interface PrecipitationData {
  dt: number,
  precipitation: number,
}

export interface WeatherDescription {
  id: number,
  main: string,
  description: string,
  icon: string,
}

export interface WeatherData {
  dt: number,
  sunrise: number,
  sunset: number,
  temp: number,
  feels_like: number,
  pressure: number,
  humidity: number,
  dew_point: number,
  uvi: number,
  clouds: number,
  visibility: number,
  wind_speed: number,
  wind_deg: number,
  weather: WeatherDescription[],
  rain?: any,
  snow?: any,
}
export interface GeoData{
  name: string,
  lat: number,
  lon : number,
  country: string
}
export interface OneCallData {
  lat: number,
  lon: number,
  timezone: string,
  timezone_offset: number,
  current: WeatherData,
  minutely: PrecipitationData[],
  hourly: WeatherData[],
}