import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogConsultationComponent } from '../../components/dialog-consultation/dialog-consultation.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {}

  public navigate(fragment: string): void {
    this.router.navigate(['/'], { fragment: fragment });
  }

  public openDialog() {
    this.dialog.open(DialogConsultationComponent, {
      width: '727px',
    });
  }
}
