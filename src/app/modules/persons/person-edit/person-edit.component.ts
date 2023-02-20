import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Country } from '@app/model/country';
import { Person } from '@app/model/person';
import { PersonListViewComponent } from '../person-list-view/person-list-view.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {

  personForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<PersonListViewComponent>, private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any) {
    this.personForm = this.fb.group({
      firstName: [data.resource.firstName, Validators.required],
      lastName: [data.resource.lastName, Validators.required],
      country: [data.resource.country?.name, Validators.required]
    });
  }

  ngOnInit(): void {
    const person = this.data.resource;
    if (person.id) {
      window.history.replaceState({}, '', `/persons/${person.id}`);
    } else {
      window.history.replaceState({}, '', `/persons`)
    }
    this.dialogRef.afterClosed().subscribe(() => {
      window.history.replaceState({}, '', `/persons`);
    });
  }

  onSubmit(): void {
    const person = new Person();
    const value = this.personForm.value;
    person.firstName = value.firstName;
    person.lastName = value.lastName;
    const country = new Country();
    country.name = value.country;
    person.country = country;
    this.data.callback(person);
    this.dialogRef.close();
  }

}
