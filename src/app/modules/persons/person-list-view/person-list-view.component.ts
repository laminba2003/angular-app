import { Component, OnInit, ViewChild } from '@angular/core';
import { Person } from './../../../model/person';
import { MatDialog } from '@angular/material/dialog';
import { PersonDetailsComponent } from '../person-details/person-details.component';
import { Page } from 'src/app/model/page';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngxs/store';
import { Observable, withLatestFrom } from 'rxjs';
import { DeletePerson, GetPerson, GetPersons, SearchPersons } from './../person.actions';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SetSearch } from 'src/app/app.state';


@Component({
  selector: 'app-person-list-view',
  templateUrl: './person-list-view.component.html',
  styleUrls: ['./person-list-view.component.css']
})
export class PersonListViewComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'country.name', 'actions'];
  page: Page<Person> = { content: [], totalElements: 0, number: 0, size: 5 };
  dataSource: MatTableDataSource<Person> = new MatTableDataSource(this.page.content);
  personInfo$: Observable<Person>;
  pageInfo$: Observable<Page<Person>>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public auth: AuthService, private route: ActivatedRoute, private store: Store, private dialog: MatDialog) {
    this.pageInfo$ = this.store.select(state => state.personstate.page);
    this.personInfo$ = this.store.select(state => state.personstate.person);
    this.store.dispatch(new SetSearch(this.search.bind(this)));
  }

  ngOnInit(): void {
    this.getPersons();
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getPerson(id);
    }
  }

  getPersons(): void {
    this.store.dispatch(new GetPersons(this.page.number, this.page.size))
      .pipe(withLatestFrom(this.pageInfo$)).subscribe(([_, page]) => {
        this.page = page;
        this.refreshDataSource();
      });
  }

  getPerson(id: number): void {
    this.store.dispatch(new GetPerson(id))
      .pipe(withLatestFrom(this.personInfo$)).subscribe(([_, person]) => {
        this.dialog.open(PersonDetailsComponent, {
          data: person
        });
      });
    window.history.replaceState({}, '', `/persons/${id}`);
  }

  editPerson(id: number, e: Event): void {
    e.stopPropagation();
  }

  deletePerson(id: number, e: Event): void {
    e.stopPropagation();
    this.dialog.open(ConfirmDialogComponent, {
      data: () => {
        this.store.dispatch(new DeletePerson(id)).pipe(withLatestFrom(this.pageInfo$)).subscribe(([_, page]) => {
          (page.totalElements == page.size && page.content.length < page.size) ? this.getPersons() : this.refreshDataSource();
        });
      },
      disableClose: true
    });
  }

  handlePagination(event: any): void {
    this.page.number = event.pageIndex;
    this.page.size = event.pageSize;
    const isSearching = this.store.selectSnapshot(state => state.personstate.isSearching);
    const searchQuery = this.store.selectSnapshot(state => state.personstate.searchQuery);
    isSearching ? this.handleSearch(searchQuery) : this.getPersons();
  }

  refreshDataSource(): void {
    this.dataSource = new MatTableDataSource(this.page.content);
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'country.name':
          return item.country.name;
        case 'id':
          return Number(item[property as keyof Person]);
        default:
          return String(item[property as keyof Person]);
      }
    };
    this.dataSource.sort = this.sort;
    this.paginator.pageIndex = this.page.number;
  }

  search(query: string): void {
    this.page.number = 0;
    this.handleSearch(query);
  }

  handleSearch(query: string): void {
    this.store.dispatch(new SearchPersons(query, this.page.number, this.page.size))
      .pipe(withLatestFrom(this.pageInfo$)).subscribe(([_, page]) => {
        this.page = page;
        this.refreshDataSource();
      });
  }

  refresh(): void {
    this.page.number = 0;
    this.getPersons();
  }

}