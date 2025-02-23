import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-thank',
  templateUrl: './dialog-thank.component.html',
  styleUrls: ['./dialog-thank.component.scss'],
})
export class DialogThankComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<DialogThankComponent>) {}

  ngOnInit(): void {}

  public closeModal(): void {
    this.dialogRef.close();
  }
}
