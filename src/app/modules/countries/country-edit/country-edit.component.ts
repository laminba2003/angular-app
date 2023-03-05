import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Country } from '@app/model/country';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-country-edit',
  templateUrl: './country-edit.component.html',
  styleUrls: ['./country-edit.component.css']
})
export class CountryEditComponent implements OnInit {

  form: FormGroup;
  
  constructor(private dialogRef: MatDialogRef<any>, private fb: FormBuilder,
    private store: Store, @Inject(MAT_DIALOG_DATA) private data: any) {
    this.form = this.fb.group({
      name: [data.resource.name, Validators.required],
      capital: [data.resource.capital, Validators.required],
      population: [data.resource.population, Validators.required]
    });
  }

  ngOnInit(): void {
    const country = this.data.resource;
    if (country.name) {
      window.history.replaceState({}, '', `/countries/${country.name}`);
    } else {
      window.history.replaceState({}, '', `/countries`)
    }
    this.dialogRef.afterClosed().subscribe(() => {
      window.history.replaceState({}, '', `/countries`);
    });
  }

  onSubmit(): void {
    this.data.callback(this.getData());
    this.dialogRef.close();
  }

  private getData(): Country {
    const country = new Country();
    country.name = this.form.value.name;
    country.capital = this.form.value.capital;
    country.population = this.form.value.population;
    return country;
  }

}