import { Injectable } from '@angular/core';
import { Person } from '@app/model/person';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Page } from '@app/model/page';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private readonly backendUrl = '/apis/persons';

  constructor(private httpClient: HttpClient) { }

  getPersons(page: number, size: number = 5): Observable<Page<Person>> {
    return this.httpClient.get<Page<Person>>(this.backendUrl, { params: { page: page, size: size } });
  }

  getPerson(id: number): Observable<Person> {
    return this.httpClient.get<Person>(this.backendUrl + "/" + id);
  }

  createPerson(person: Person): Observable<Person> {
    return this.httpClient.post<Person>(this.backendUrl, person);
  }

  updatePerson(id: number, person: Person): Observable<Person> {
    return this.httpClient.put<Person>(this.backendUrl + "/" + id, person);
  }

  deletePerson(id: number): Observable<any> {
    return this.httpClient.delete(this.backendUrl + "/" + id);
  }

  searchPersons(query: string, page: number, size: number = 5): Observable<Page<Person>> {
    return this.httpClient.get<Page<Person>>(this.backendUrl + "/search", { params: { query: query, page: page, size: size } });
  }

}
