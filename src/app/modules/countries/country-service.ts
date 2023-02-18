import { Injectable } from '@angular/core';
import { Country } from '@app/model/country';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Page } from '@app/model/page';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private readonly backendUrl = '/apis/countries';

  constructor(private httpClient: HttpClient) { }

  getCountries(page: number, size: number = 5): Observable<Page<Country>> {
    return this.httpClient.get<Page<Country>>(this.backendUrl, { params: { page: page, size: size } });
  }

  getCountry(name: string): Observable<Country> {
    return this.httpClient.get<Country>(this.backendUrl + "/" + name);
  }

  deleteCountry(name: string): Observable<any> {
    return this.httpClient.delete(this.backendUrl + "/" + name);
  }

  searchCountries(query: string, page: number, size: number = 5): Observable<Page<Country>> {
    return this.httpClient.get<Page<Country>>(this.backendUrl + "/search", { params: { query: query, page: page, size: size } });
  }

}