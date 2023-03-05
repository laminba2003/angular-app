import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Country } from '@app/model/country';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css']
})
export class CountryDetailsComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public country: Country) {

  }

  ngOnInit(): void {
    window.history.replaceState({}, '', `/countries/${this.country.name}`);
    this.dialogRef.afterClosed().subscribe(() => {
      window.history.replaceState({}, '', `/countries`);
    });
  }

}
