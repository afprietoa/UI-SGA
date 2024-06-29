import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeasurementService } from 'src/app/core/services/measurement.service';

@Component({
  selector: 'app-edit-measurements',
  templateUrl: './edit-measurements.component.html',
  styleUrls: ['./edit-measurements.component.css']
})
export class EditMeasurementsComponent implements OnInit {

  editForm!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private measurementService: MeasurementService,
    private fb:FormBuilder,
    public dialogRef: MatDialogRef<EditMeasurementsComponent>
  ){
    this.editForm = this.fb.group({
      date:['', Validators.required],
      ph:['', Validators.required],
      temperature:['', Validators.required],
      userId:['', Validators.required],
      pollutantId:['', Validators.required],
      resourceId:['', Validators.required]
    })
  }
  
  ngOnInit(): void {
    const measurement = this.data.measurement;
    this.measurementService.getMeasurement(measurement).subscribe({
      next: (response: any) => {
        const measurementData = response;
        this.editForm = this.fb.group({
          date:[measurementData.date, Validators.required],
          ph:[measurementData.ph, Validators.required],
          temperature:[measurementData.temperature, Validators.required],
          userId:[measurementData.userId, Validators.required],
          pollutantId:[measurementData.pollutant.pollutantId, Validators.required],
          resourceId:[measurementData.resource.resourceId, Validators.required],
        })
      },
      error: (error: any) =>{

      }
    })
  }
  onSubmit(): void {
    const measurementId = this.data.measurement;
    console.log(this.editForm.value)
    if(this.editForm.valid) {
      const measurement = {
        measurementId: measurementId,
        date: this.editForm.value.date,
        ph: Number(this.editForm.value.ph),
        temperature: Number(this.editForm.value.temperature),
        userId: Number(this.editForm.value.userId),
        pollutantId: Number(this.editForm.value.pollutantId),
        resourceId: Number(this.editForm.value.resourceId)
      }

      this.measurementService. patchMeasurement(measurement).subscribe({
        next: (response: any)=>{
          this.dialogRef.close();
        },
        error: (error: any)=>{
          console.log(error)
        }
      })
    }
  }
}
