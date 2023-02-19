import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Person } from '@app/model/person';
import { PersonListViewComponent } from '../person-list-view/person-list-view.component';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<PersonListViewComponent>, @Inject(MAT_DIALOG_DATA) public person: Person) { }

  ngOnInit(): void {
    if (this.person) {
      window.history.replaceState({}, '', `/persons/${this.person.id}`);
      this.dialogRef.afterClosed().subscribe(() => {
        window.history.replaceState({}, '', `/persons`);
      });
    }
  }

}
