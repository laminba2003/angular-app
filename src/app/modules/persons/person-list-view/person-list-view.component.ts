import { Component, OnInit } from '@angular/core';
import { Person } from './../../../model/person';
import { MatDialog } from '@angular/material/dialog';
import { PersonDetailsComponent } from '../person-details/person-details.component';
import { Store } from '@ngxs/store';
import { withLatestFrom } from 'rxjs';
import { DeletePerson, GetPerson, GetPersons, SearchPersons } from './../person.actions';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ListView } from '../../../components/ListView';


@Component({
  selector: 'app-person-list-view',
  templateUrl: './person-list-view.component.html',
  styleUrls: ['./person-list-view.component.css']
})
export class PersonListViewComponent extends ListView<Person> implements OnInit {

  constructor(public auth: AuthService, private route: ActivatedRoute, store: Store, dialog: MatDialog) {
    super(store, dialog, () => { return this.getPersons() });
    this.displayedColumns = ['id', 'firstName', 'lastName', 'country', 'actions'];
    this.pageInfo$ = this.store.select(state => state.personstate.page);
    this.entityInfo$ = this.store.select(state => state.personstate.person);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getPerson(id);
    }
  }

  getPersons(): void {
    this.store.dispatch(new GetPersons(this.page.number, this.page.size))
      .pipe(withLatestFrom(this.pageInfo$)).subscribe(([_, page]) => {
        this.update(page);
      });
  }

  getPerson(id: number): void {
    this.store.dispatch(new GetPerson(id))
      .pipe(withLatestFrom(this.entityInfo$)).subscribe(([_, person]) => {
        this.show(PersonDetailsComponent, person);
      });
  }

  editPerson(id: number, e: Event): void {
    e.stopPropagation();
    this.store.dispatch(new GetPerson(id))
      .pipe(withLatestFrom(this.entityInfo$)).subscribe(([_, person]) => {
        this.show(PersonDetailsComponent, person);
      });
  }

  deletePerson(id: number, e: Event): void {
    e.stopPropagation();
    this.confirm(() => {
      this.store.dispatch(new DeletePerson(id))
        .pipe(withLatestFrom(this.pageInfo$)).subscribe(([_, page]) => {
          this.update(page);
        });
    });
  }

  override handleSorting(): void {
    this.dataSource.sortingDataAccessor = (person, property) => {
      return property == 'country' ? person.country.name : this.getProperty(person, property as keyof Person);
    };
  }

  override handleSearch(query: string): void {
    this.store.dispatch(new SearchPersons(query, this.page.number, this.page.size))
      .pipe(withLatestFrom(this.pageInfo$)).subscribe(([_, page]) => {
        this.update(page);
      });
  }

}