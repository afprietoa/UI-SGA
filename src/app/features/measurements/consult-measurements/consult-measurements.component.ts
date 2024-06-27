import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MeasurementService } from 'src/app/core/services/measurement.service';

@Component({
  selector: 'app-consult-measurements',
  templateUrl: './consult-measurements.component.html',
  styleUrls: ['./consult-measurements.component.css']
})
export class ConsultMeasurementsComponent implements OnInit {


  measurementData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private measurementService: MeasurementService,
    public dialogRef: MatDialogRef<ConsultMeasurementsComponent>
  ){}

  ngOnInit(): void {
    const measurement = this.data.measurement;
    console.log(measurement)
   this.measurementService.getMeasurement(measurement).subscribe({
     next:(response: any) => {
       
       this.measurementData = response;
       console.log(this.measurementData);
       
     },
     error:(error) => {
       console.log(error);
     }
    });
  }

}
