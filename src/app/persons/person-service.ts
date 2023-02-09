import { Injectable } from '@angular/core';
import { Person } from '../model/person';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Page } from './../model/page';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private readonly backendUrl = '/apis/persons'

  constructor(private httpClient: HttpClient) { }

  getPersons(): Observable<Page<Person>> {
    return this.httpClient.get<Page<Person>>(this.backendUrl);
  }

}
