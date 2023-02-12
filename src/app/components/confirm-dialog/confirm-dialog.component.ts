import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public callback: Function) {}

  ngOnInit(): void {
  }

  confirm(): void {
    this.dialogRef.close();
    this.callback();
  }


}
