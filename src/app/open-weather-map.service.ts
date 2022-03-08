import { Injectable } from '@angular/core';
import { HttpClient, HttpParamsOptions } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherMapService {
  constructor(private http: HttpClient) {
  }
  doRequest<T>(url: string, ourParams: any): Observable<any> {
    var params = {
      appid: "",
      ...ourParams
    };

    var baseUrl = `https://api.openweathermap.org/${url}`;

    var options: any = {
      observe: "body",
      responseType: "json"
    };

    var v: string[] = Object.keys(params).map(
      param => `${param}=${params[param]}`
    )
    return this.http.get<T>(`${baseUrl}?${v.join("&")}`, options);
  }

  requestGeoData(city : String): Observable<any> {
    var params: any = {
      q: city,
      limit: 5
    };

    return this.doRequest<GeoData[]>("geo/1.0/direct", params);
  }

  requestWeatherData(data :GeoData): Observable<any> {
    var params: any = {
      lat: data.lat.toString(),
      lon: data.lon.toString(),
      units: "metric",
    };

    return this.doRequest<OneCallData>("data/2.5/onecall", params);
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

export interface DailyTemperatureData {
  day: number,
  min: number,
  max: number,
  night: number,
  eve: number,
  morn: number,
}

export interface WeatherData {
  dt: number,
  sunrise: number,
  sunset: number,
  temp: number | DailyTemperatureData,
  feels_like: number | DailyTemperatureData,
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

export interface GeoData {
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
  daily: WeatherData[],
}
