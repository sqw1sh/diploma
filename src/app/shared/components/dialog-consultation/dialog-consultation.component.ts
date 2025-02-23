import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RequestService } from '../../services/request.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DefaultResponseType } from 'src/app/types/default-response.type';
import { DialogThankComponent } from '../dialog-thank/dialog-thank.component';

@Component({
  selector: 'app-dialog-consultation',
  templateUrl: './dialog-consultation.component.html',
  styleUrls: ['./dialog-consultation.component.scss'],
})
export class DialogConsultationComponent implements OnInit {
  public consultationForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
  });

  constructor(
    private dialogRef: MatDialogRef<DialogConsultationComponent>,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private requestService: RequestService
  ) {}

  ngOnInit(): void {}

  get name() {
    return this.consultationForm.get('name');
  }

  get phone() {
    return this.consultationForm.get('phone');
  }

  public addRequest(): void {
    if (this.consultationForm.valid) {
      if (this.name?.value && this.phone?.value) {
        this.requestService
          .addRequest(this.name.value, this.phone.value, 'consultation')
          .subscribe((data: DefaultResponseType) => {
            if (data.error) {
              this._snackBar.open(data.message);
              throw new Error(data.message);
            }

            this.dialogRef.close();
            this.dialog.open(DialogThankComponent, {
              width: '727px',
              height: '489px',
            });
          });
      }
    }
  }
}
