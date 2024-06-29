import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MeasurementService } from 'src/app/core/services/measurement.service';

@Component({
  selector: 'app-disable-measurements',
  templateUrl: './disable-measurements.component.html',
  styleUrls: ['./disable-measurements.component.css']
})
export class DisableMeasurementsComponent implements OnInit {

  mensaje: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private measurementService: MeasurementService,
    public dialogRef: MatDialogRef<DisableMeasurementsComponent>
  ){}

  ngOnInit(): void {
    const id = this.data.measurement;



    
   this.measurementService.deleteMeasurement(id).subscribe({
     next: (response: any) => {
       
      console.log(response);
      this.mensaje = "Measurement deleted successfully!";
       
     },
     error: (error) => {
       console.log(error);
       this.mensaje = error;
     }
    });
  }

}
