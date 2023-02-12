import { Component, OnInit, ViewChild } from '@angular/core';
import { Person } from './../../model/person';
import { MatDialog } from '@angular/material/dialog';
import { PersonDetailsComponent } from '../person-details/person-details.component';
import { Page } from 'src/app/model/page';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Store } from '@ngxs/store';
import { Observable, withLatestFrom } from 'rxjs';
import { DeletePerson, GetPersons } from './../person.actions';
import { ConfirmDialogComponent } from './../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-person-list-view',
  templateUrl: './person-list-view.component.html',
  styleUrls: ['./person-list-view.component.css']
})
export class PersonListViewComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'country', 'actions'];
  page: Page<Person> = { content: [], totalElements: 0, number: 0, size: 5 };
  pageInfo$: Observable<Page<Person>>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Person>;


  constructor(private store: Store, public dialog: MatDialog) { 
    this.pageInfo$ = this.store.select(state => state.personstate.page);
  }

  ngOnInit(): void {
    this.getPersons();
  }

  getPersons() {
    this.store.dispatch(new GetPersons(this.page.number, this.page.size))
      .pipe(withLatestFrom(this.pageInfo$)).subscribe(([_, page]) => {
        this.page = page;
      });
  }

  showPerson(id: number): void {
    this.dialog.open(PersonDetailsComponent, {
      data: id
    });
  }

  editPerson(id: number, e: Event): void {
    e.stopPropagation();
  }

  deletePerson(id: number, e: Event): void {
    e.stopPropagation();
    this.dialog.open(ConfirmDialogComponent, {
      data: () => {
        this.store.dispatch(new DeletePerson(id)).pipe(withLatestFrom(this.pageInfo$)).subscribe(([_, page]) => {
          if(page.totalElements == page.size && page.content.length < page.size) {
              this.getPersons();
          }
        });
      },
      disableClose: true
    });
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
