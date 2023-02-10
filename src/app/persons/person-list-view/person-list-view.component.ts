import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { PersonService } from './../person-service';
import { Person } from './../../model/person';
import { MatDialog } from '@angular/material/dialog';
import { PersonDetailsComponent } from '../person-details/person-details.component';
import { Page } from 'src/app/model/page';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-person-list-view',
  templateUrl: './person-list-view.component.html',
  styleUrls: ['./person-list-view.component.css']
})
export class PersonListViewComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'country', 'actions'];
  page: Page<Person> = {content : [], totalElements : 0, current : 0, size : 5};
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isLoading: boolean = true;


  constructor(private personService: PersonService, public dialog: MatDialog) { }

  ngAfterViewInit(): void {
    this.getPersons();
  }

  getPersons() {
    this.isLoading = true;
    this.personService.getPersons(this.page.current, this.page.size).subscribe((response) => {
      this.page = response;
      console.log(this.page);
      this.isLoading = false;
    });
  }

  handlePage(event: any) {
    this.page.current = event.pageIndex;
    this.page.size = event.pageSize;
    this.getPersons();
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
    console.log(id);
  }

  deletePerson(id: bigint, e: Event): void {
    e.stopPropagation();
    console.log(id);
  }

}
