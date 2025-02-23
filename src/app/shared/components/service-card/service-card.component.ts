import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServiceType } from 'src/app/types/service.type';
import { DialogOrderComponent } from '../dialog-order/dialog-order.component';

@Component({
  selector: 'service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss'],
})
export class ServiceCardComponent implements OnInit {
  @Input() service!: ServiceType;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  public openDialog(service: string) {
    this.dialog.open(DialogOrderComponent, {
      width: '727px',
      data: {
        service: service,
      },
    });
  }
}
