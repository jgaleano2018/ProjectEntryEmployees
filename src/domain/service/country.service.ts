import { HttpBackend, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from 'src/data/interface/country.interface';

/**
 * Servicio que contiene los métodos para consumir los servicios de tipo api/rest de compromisos al backEnd.
 */
@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(
    private _httpClient: HttpClient,
    private _httpClientBypassInterceptor: HttpBackend
  ) { }

  /**
   * Este método recibe el número de identificación del Cliente y el tipo de documento para consultar los créditos del Cliente.
   * @returns Rerorna la respuesta del set de datos de los créditos del Cliente.
   */
  public getCountries(): Observable<Country> {
    const params = new HttpParams()
    return this._httpClient.get<Country>('http://localhost:4200/countries/getCountries', { params });
  }

}
