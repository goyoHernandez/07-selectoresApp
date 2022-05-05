import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private _regions: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  private apiUrl: string = 'https://restcountries.com/v3.1';
  private apiUrl2: string = 'https://restcountries.com/v2';

  get Regions(): string[] {
    return [...this._regions];
  }

  get httpParams() {
    return new HttpParams().set('fields', 'name,cca3,borders');
  }

  constructor(private http: HttpClient) { }

  GetCountriesByRegion = (region: string): Observable<Country[]> => {
    const url = `${this.apiUrl}/region/${region}`;
    return this.http.get<Country[]>(url, { params: this.httpParams });
  }

  GetCountryByCode = (code: string): Observable<Country | null> => {
    if (!code)
      return of(null);

    const url = `${this.apiUrl2}/alpha/${code}`;
    return this.http.get<Country>(url, { params: this.httpParams });
  }
}
