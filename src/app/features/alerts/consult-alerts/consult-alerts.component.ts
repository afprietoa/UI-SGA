import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-consult-alerts',
  templateUrl: './consult-alerts.component.html',
  styleUrls: ['./consult-alerts.component.css']
})
export class ConsultAlertsComponent implements OnInit {


  alertData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<ConsultAlertsComponent>
  ){}

  ngOnInit(): void {
    const alert = this.data.alert;
    console.log(alert)
   this.alertService.getAlert(alert).subscribe({
     next:(response: any) => {
       
       this.alertData = response;
       console.log(this.alertData);
       
     },
     error:(error) => {
       console.log(error);
     }
    });
  }

}
