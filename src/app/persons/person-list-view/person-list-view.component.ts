import { Component, OnInit, ViewChild } from '@angular/core';
import { Person } from './../../model/person';
import { MatDialog } from '@angular/material/dialog';
import { PersonDetailsComponent } from '../person-details/person-details.component';
import { Page } from 'src/app/model/page';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Select, Store } from '@ngxs/store';
import { Observable, withLatestFrom } from 'rxjs';
import { PersonState } from '../person.state';
import { GetPerson, GetPersons } from './../person.actions';

@Component({
  selector: 'app-person-list-view',
  templateUrl: './person-list-view.component.html',
  styleUrls: ['./person-list-view.component.css']
})
export class PersonListViewComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'country', 'actions'];
  page: Page<Person> = { content: [], totalElements: 0, number: 0, size: 5 };
  @Select(PersonState.selectStatePersonsData) pageInfo$: Observable<Page<Person>>;
  @Select(PersonState.selectStatePersonData) personInfo$: Observable<Person>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Person>;
  isLoading: boolean = true;

  constructor(private store: Store, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPersons();
  }

  getPersons() {
    this.isLoading = true;
    this.store.dispatch(new GetPersons(this.page.number, this.page.size))
      .pipe(withLatestFrom(this.pageInfo$)).subscribe(([_, page]) => {
        this.page = page;
        this.isLoading = false;
      });
  }

  showPerson(id: number): void {
    this.store.dispatch(new GetPerson(id))
      .pipe(withLatestFrom(this.personInfo$)).subscribe(([_, person]) => {
        this.dialog.open(PersonDetailsComponent, {
          data: person
        });
      });
  }

  editPerson(id: bigint, e: Event): void {
    e.stopPropagation();
  }

  deletePerson(id: bigint, e: Event): void {
    e.stopPropagation();
  }

  handlePagination(event: any) {
    this.page.number = event.pageIndex;
    this.page.size = event.pageSize;
    this.getPersons();
  }

  handleSort(sortState: Sort): void {
    let property = sortState.active as keyof Person;
    if (sortState.direction == "asc") {
      this.page.content.sort((a, b) => (a[property] < b[property] ? -1 : 1));
    } else {
      this.page.content.sort((a, b) => (a[property] > b[property] ? -1 : 1));
    }
    this.table.renderRows();
  }

}
