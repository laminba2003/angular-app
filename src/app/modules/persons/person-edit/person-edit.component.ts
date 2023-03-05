import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Country } from '@app/model/country';
import { Person } from '@app/model/person';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { withLatestFrom } from 'rxjs';
import { Store } from '@ngxs/store';
import { SearchCountries } from '@app/modules/countries/country.actions';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {

  form: FormGroup;
  countries: Country[] = [];

  constructor(private dialogRef: MatDialogRef<any>, private fb: FormBuilder,
    private store: Store, @Inject(MAT_DIALOG_DATA) private data: any) {
    this.form = this.fb.group({
      firstName: [data.resource.firstName, Validators.required],
      lastName: [data.resource.lastName, Validators.required],
      country: [data.resource.country?.name, Validators.required]
    });
  }

  ngOnInit(): void {
    const person = this.data.resource;
    if (person.id) {
      window.history.replaceState({}, '', `/persons/${person.id}`);
      this.countries.push(person.country);
    } else {
      window.history.replaceState({}, '', `/persons`)
    }
    this.dialogRef.afterClosed().subscribe(() => {
      window.history.replaceState({}, '', `/persons`);
    });
  }

  onSubmit(): void {
    if (!this.countries.find(country => country.name == this.form.controls["country"].value)) {
      return this.form.patchValue({ country: "" });
    }
    this.data.callback(this.getData());
    this.dialogRef.close();
  }

  searchCountry(name: any): void {
    const pageInfo$ = this.store.select(state => state.countrystate.page);
    this.store.dispatch(new SearchCountries(name, 0, 5))
      .pipe(withLatestFrom(pageInfo$)).subscribe(([_, page]) => {
        this.countries = page.content;
      });
  }

  private getData(): Person {
    const person = new Person();
    person.firstName = this.form.value.firstName;
    person.lastName = this.form.value.lastName;
    const country = new Country();
    country.name = this.form.value.country;
    person.country = country;
    return person;
  }

}