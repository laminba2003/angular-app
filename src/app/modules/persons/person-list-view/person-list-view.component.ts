import { Component, OnInit } from '@angular/core';
import { Person } from '@app/model/person';
import { PersonDetailsComponent } from '../person-details/person-details.component';
import { DeletePerson, GetPerson, GetPersons, SearchPersons } from './../person.actions';
import { ListViewComponent, State } from '@components/ListViewComponent';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-person-list-view',
  templateUrl: './person-list-view.component.html',
  styleUrls: ['./person-list-view.component.css']
})
export class PersonListViewComponent extends ListViewComponent<Person> implements OnInit {

  constructor(private route: ActivatedRoute) {
    super(new State(state => state.personstate.page, state => state.personstate.person),
      () => { return this.getPersons() }, ['id', 'firstName', 'lastName', 'country', 'actions']);
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getPerson(id);
    }
  }

  getPersons(): void {
    this.getResources(new GetPersons(this.page.number, this.page.size));
  }

  getPerson(id: number): void {
    this.getResource(new GetPerson(id), PersonDetailsComponent);
  }

  editPerson(id: number): void {
    this.editResource(new GetPerson(id), PersonDetailsComponent);
  }

  deletePerson(id: number): void {
    this.deleteResource(new DeletePerson(id));
  }

  override handleSorting(): void {
    this.dataSource.sortingDataAccessor = (person, property) => {
      return property == 'country' ? person.country.name : this.getProperty(person, property);
    };
  }

  override handleSearch(query: string): void {
    this.getResources(new SearchPersons(query, this.page.number, this.page.size));
  }

}