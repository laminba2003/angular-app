import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Person } from './../../model/person';
import { PersonListViewComponent } from './../person-list-view/person-list-view.component';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<PersonListViewComponent>, @Inject(MAT_DIALOG_DATA) public data : Person) {}

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

}
