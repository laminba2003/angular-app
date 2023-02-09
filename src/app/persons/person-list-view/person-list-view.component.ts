import { Component, OnInit } from '@angular/core';
import { PersonService } from './../person-service';
import { Person } from './../../model/person';

@Component({
  selector: 'app-person-list-view',
  templateUrl: './person-list-view.component.html',
  styleUrls: ['./person-list-view.component.css']
})
export class PersonListViewComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'country'];
  persons: Person[] = [];

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.personService.getPersons().subscribe((response) => {
      this.persons = response.content;
      console.log(this.persons);
    });
  }

}
