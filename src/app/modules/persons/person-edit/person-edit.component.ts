import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Country } from '@app/model/country';
import { Person } from '@app/model/person';
import { PersonListViewComponent } from '../person-list-view/person-list-view.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, withLatestFrom } from 'rxjs';
import { Store } from '@ngxs/store';
import { SearchCountries } from '@app/modules/countries/country.actions';
import { Page } from '@app/model/page';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {

  personForm: FormGroup;
  pageInfo$: Observable<Page<Country>>;
  countries: Country[] = [];

  constructor(private dialogRef: MatDialogRef<PersonListViewComponent>, private fb: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) private data: any) {
    this.personForm = this.fb.group({
      firstName: [data.resource.firstName, Validators.required],
      lastName: [data.resource.lastName, Validators.required],
      country: [data.resource.country?.name, Validators.required]
    });
    this.pageInfo$ = this.store.select(state => state.countrystate.page);
    this.personForm.get("country")?.valueChanges.subscribe(value => {
      console.log(value);
   })
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
    const value = this.personForm.controls["country"].value;
    if(!this.countries.find(country => country.name == value)) {
      this.personForm.patchValue({country: ""});
      return;
    }
    const person = new Person();
    person.firstName = this.personForm.value.firstName;
    person.lastName = this.personForm.value.lastName;
    const country = new Country();
    country.name = this.personForm.value.country;
    person.country = country;
    this.data.callback(person);
    this.dialogRef.close();
  }

  searchCountry(name: any): void {
    this.store.dispatch(new SearchCountries(name, 0, 5))
      .pipe(withLatestFrom(this.pageInfo$)).subscribe(([_, page]) => {
        this.countries = page.content;
      });
  }

}
