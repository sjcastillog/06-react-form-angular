import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Country } from '../interfaces';

@Injectable({ providedIn: 'root' }) // Proveer en el app.config -> provideHttpClient(withFetch()) // para peticiones http
export class CountryService {
  private baseUrl = `https://restcountries.com/v3.1`;
  private http = inject(HttpClient);

  private _regions = ['Africa', 'Americas', 'Asia', 'Europa', 'Oceania'];

  get regions(): string[] {
    return [...this._regions];
  }

  getCountriesByRegion(region: string): Observable<Country[]> {
    if (!region) return of([]);
    // of se usa para retornar un observable -  es una funcion que genera observables

    const url = `${this.baseUrl}/region/${region.toLowerCase()}?fields=cca3,name,borders`;

    return this.http.get<Country[]>(url); // retorna un arreglo de country
  }

  getCountryAlphaCode(alphaCode: string): Observable<Country> {
    const url = `${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`;

    return this.http.get<Country>(url); // retorna un country
  }

  getCountryNamesByCodeArray(countryCodes: string[]): Observable<Country[]> {
    if (!countryCodes || countryCodes.length === 0) return of([]);
    const countriesRequests: Observable<Country>[] = [];

    countryCodes.forEach((code) => {
      const request = this.getCountryAlphaCode(code);
      countriesRequests.push(request);
    });

    return combineLatest(countriesRequests);
  }
}
