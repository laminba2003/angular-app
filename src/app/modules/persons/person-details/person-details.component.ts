import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Person } from '@app/model/person';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public person: Person) {

  }

  ngOnInit(): void {
    window.history.replaceState({}, '', `/persons/${this.person.id}`);
    this.dialogRef.afterClosed().subscribe(() => {
      window.history.replaceState({}, '', `/persons`);
    });
  }


}