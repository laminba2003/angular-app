import { Component, OnInit } from '@angular/core';
import { Person } from './../../../model/person';
import { PersonDetailsComponent } from '../person-details/person-details.component';
import { DeletePerson, GetPerson, GetPersons, SearchPersons } from './../person.actions';
import { ListViewComponent } from '../../../components/ListViewComponent';

@Component({
  selector: 'app-person-list-view',
  templateUrl: './person-list-view.component.html',
  styleUrls: ['./person-list-view.component.css']
})
export class PersonListViewComponent extends ListViewComponent<Person> implements OnInit {

  constructor() {
    super({ page: (state) => state.personstate.page, entity: (state) => state.personstate.person },
      () => { return this.getPersons() }, ['id', 'firstName', 'lastName', 'country', 'actions']);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getPerson(id);
    }
  }

  getPersons(): void {
    this.getEntities(new GetPersons(this.page.number, this.page.size));
  }

  getPerson(id: number): void {
    this.getEntity(new GetPerson(id), PersonDetailsComponent);
  }

  editPerson(id: number, event: Event): void {
    this.editEntity(new GetPerson(id), PersonDetailsComponent, event);
  }

  deletePerson(id: number, event: Event): void {
    this.deleteEntity(new DeletePerson(id), event);
  }

  override handleSorting(): void {
    this.dataSource.sortingDataAccessor = (person, property) => {
      return property == 'country' ? person.country.name : this.getProperty(person, property as keyof Person);
    };
  }

  override handleSearch(query: string): void {
    this.getEntities(new SearchPersons(query, this.page.number, this.page.size));
  }

}