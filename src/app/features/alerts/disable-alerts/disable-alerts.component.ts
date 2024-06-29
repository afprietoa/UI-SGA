import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-disable-alerts',
  templateUrl: './disable-alerts.component.html',
  styleUrls: ['./disable-alerts.component.css']
})
export class DisableAlertsComponent implements OnInit {



  mensaje: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<DisableAlertsComponent>
  ){}

  ngOnInit(): void {
    const id = this.data.alert;



    
   this.alertService.deleteAlert(id).subscribe({
     next: (response: any) => {
       
      console.log(response);
      this.mensaje = "Alert deleted successfully!";
       
     },
     error: (error) => {
       console.log(error);
       this.mensaje = error;
     }
    });
  }

}
