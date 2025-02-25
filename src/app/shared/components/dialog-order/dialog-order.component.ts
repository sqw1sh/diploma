import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { RequestService } from '../../services/request.service';
import { DefaultResponseType } from 'src/app/types/default-response.type';
import { DialogThankComponent } from '../dialog-thank/dialog-thank.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dialog-order',
  templateUrl: './dialog-order.component.html',
  styleUrls: ['./dialog-order.component.scss'],
})
export class DialogOrderComponent implements OnInit, OnDestroy {
  public orderForm: FormGroup = this.fb.group({
    service: [this.data.service, Validators.required],
    name: ['', Validators.required],
    phone: ['', Validators.required],
  });

  private addRequestSubscription$: Subscription | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogOrderComponent>,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private requestService: RequestService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.addRequestSubscription$?.unsubscribe();
  }

  get service() {
    return this.orderForm.get('service');
  }

  get name() {
    return this.orderForm.get('name');
  }

  get phone() {
    return this.orderForm.get('phone');
  }

  public addRequest(): void {
    if (this.orderForm.valid) {
      if (this.name?.value && this.phone?.value && this.service?.value) {
        this.addRequestSubscription$ = this.requestService
          .addRequest(
            this.name.value,
            this.phone.value,
            'order',
            this.service.value
          )
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
