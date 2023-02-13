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
import { DeletePerson, GetPersons } from './../person.actions';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-person-list-view',
  templateUrl: './person-list-view.component.html',
  styleUrls: ['./person-list-view.component.css']
})
export class PersonListViewComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'country.name', 'actions'];
  page: Page<Person> = { content: [], totalElements: 0, number: 0, size: 5 };
  dataSource: MatTableDataSource<Person> = new MatTableDataSource(this.page.content);
  pageInfo$: Observable<Page<Person>>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute, private store: Store, public dialog: MatDialog) {
    this.pageInfo$ = this.store.select(state => state.personstate.page);
  }

  ngOnInit(): void {
    this.getPersons();
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.showPerson(id);
    }
  }

  getPersons() {
    this.store.dispatch(new GetPersons(this.page.number, this.page.size))
      .pipe(withLatestFrom(this.pageInfo$)).subscribe(([_, page]) => {
        this.page = page;
        this.refreshDataSource();
      });
  }

  showPerson(id: number): void {
    this.dialog.open(PersonDetailsComponent, {
      data: id
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
          if (page.totalElements == page.size && page.content.length < page.size) {
            this.getPersons();
          } else {
            this.refreshDataSource();
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

  refreshDataSource(): void {
    this.dataSource = new MatTableDataSource(this.page.content);
    this.dataSource.sortingDataAccessor = (item, property) => {
      return property == 'country.name' ? item.country.name : String(item[property as keyof Person]);
    };
    this.dataSource.sort = this.sort;
  }

}