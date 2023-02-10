import { Component, OnInit } from '@angular/core';
import { PersonService } from './../person-service';
import { Person } from './../../model/person';
import {MatDialog} from '@angular/material/dialog';
import { PersonDetailsComponent } from '../person-details/person-details.component';

@Component({
  selector: 'app-person-list-view',
  templateUrl: './person-list-view.component.html',
  styleUrls: ['./person-list-view.component.css']
})
export class PersonListViewComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'country'];
  persons: Person[] = [];
  

  constructor(private personService: PersonService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.personService.getPersons().subscribe((response) => {
      this.persons = response.content;
      console.log(this.persons);
    });
  }

  showDetails(id : String) {
    console.log(id);
    const dialogRef = this.dialog.open(PersonDetailsComponent, {
      data: {name : "lamine"}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
