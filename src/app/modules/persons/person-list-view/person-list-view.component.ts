import { Component, OnInit } from '@angular/core';
import { Person } from '@app/model/person';
import { PersonDetailsComponent } from '../person-details/person-details.component';
import { CreatePerson, DeletePerson, GetPerson, GetPersons, SearchPersons, UpdatePerson } from './../person.actions';
import { ListViewComponent, State } from '@components/ListViewComponent';
import { PersonEditComponent } from '../person-edit/person-edit.component';

@Component({
  selector: 'app-person-list-view',
  templateUrl: './person-list-view.component.html',
  styleUrls: ['./person-list-view.component.css']
})
export class PersonListViewComponent extends ListViewComponent<Person> implements OnInit {

  constructor() {
    super(new State(state => state.personstate.page, state => state.personstate.person),
      () => { return this.getPersons() }, ['id', 'firstName', 'lastName', 'country.name', 'actions']);
  }

  ngOnInit(): void {
    this.getParam('id').subscribe(id => this.getPerson(id));
  }

  getPersons(): void {
    this.getResources(new GetPersons(this.page.number, this.page.size));
  }

  getPerson(id: number): void {
    this.getResource(new GetPerson(id), PersonDetailsComponent);
  }

  createPerson(): void {
    this.createResource(PersonEditComponent, (person: Person) => new CreatePerson(person));
  }

  updatePerson(id: number): void {
    this.editResource(new GetPerson(id), PersonEditComponent, (person: Person) => new UpdatePerson(id, person));
  }

  deletePerson(id: number): void {
    this.deleteResource(new DeletePerson(id));
  }

  override handleSearch(query: string): void {
    this.getResources(new SearchPersons(query, this.page.number, this.page.size));
  }

}