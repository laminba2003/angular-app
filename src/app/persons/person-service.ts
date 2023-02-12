import { Injectable } from '@angular/core';
import { Person } from '../model/person';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Page } from './../model/page';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private readonly backendUrl = '/apis/persons';

  constructor(private httpClient: HttpClient) { }

  getPersons(page: number, size: number = 5): Observable<Page<Person>> {
    return this.httpClient.get<Page<Person>>(this.backendUrl + "?page=" + page + "&size=" + size);
  }

  getPerson(id: number): Observable<Person> {
    return this.httpClient.get<Person>(this.backendUrl + "/" + id);
  }

  deletePerson(id: number): Observable<any> {
    return this.httpClient.delete(this.backendUrl + "/" + id);
  }

}
