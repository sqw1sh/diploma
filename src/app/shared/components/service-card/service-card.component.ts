import { Component, Input, OnInit } from '@angular/core';
import { ServiceType } from 'src/app/types/service.type';

@Component({
  selector: 'service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss'],
})
export class ServiceCardComponent implements OnInit {
  @Input() service!: ServiceType;

  constructor() {}

  ngOnInit(): void {}
}
