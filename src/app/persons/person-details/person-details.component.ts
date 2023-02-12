import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Observable, withLatestFrom } from 'rxjs';
import { GetPerson } from '../person.actions';
import { Person } from './../../model/person';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit {

  person: Person = new Person();
  personInfo$: Observable<Person>;

  constructor(private store: Store, @Inject(MAT_DIALOG_DATA) private id: number) {
    this.personInfo$ = this.store.select(state => state.personstate.person);
  }

  ngOnInit(): void {
    this.store.dispatch(new GetPerson(this.id))
      .pipe(withLatestFrom(this.personInfo$)).subscribe(([_, person]) => {
        this.person = person;
      });
  }


}
