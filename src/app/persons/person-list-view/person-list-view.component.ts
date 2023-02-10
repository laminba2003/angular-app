import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { PersonService } from './../person-service';
import { Person } from './../../model/person';
import { MatDialog } from '@angular/material/dialog';
import { PersonDetailsComponent } from '../person-details/person-details.component';
import { Page } from 'src/app/model/page';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-person-list-view',
  templateUrl: './person-list-view.component.html',
  styleUrls: ['./person-list-view.component.css']
})
export class PersonListViewComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'country', 'actions'];
  page: Page<Person> = { content: [], totalElements: 0, current: 0, size: 5 };
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Person>;
  isLoading: boolean = true;


  constructor(private personService: PersonService, public dialog: MatDialog) { }

  ngAfterViewInit(): void {
    this.getPersons();
  }

  getPersons() {
    this.isLoading = true;
    this.personService.getPersons(this.page.current, this.page.size).subscribe((response) => {
      this.page = response;
      this.isLoading = false;
    });
  }

  showPerson(id: bigint): void {
    this.personService.getPerson(id).subscribe((person) => {
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
    this.page.current = event.pageIndex;
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
