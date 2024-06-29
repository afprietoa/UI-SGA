import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MeasurementService } from 'src/app/core/services/measurement.service';

@Component({
  selector: 'app-create-measurements',
  templateUrl: './create-measurements.component.html',
  styleUrls: ['./create-measurements.component.css']
})
export class CreateMeasurementsComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private measurementService: MeasurementService,
    public dialogRef: MatDialogRef<CreateMeasurementsComponent>
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      date:['', [Validators.required]],
      ph:['', [Validators.required]],
      temperature:['', [Validators.required]],
      userId:['', [Validators.required]],
      pollutantId:['', [Validators.required]],
      resourceId:['', [Validators.required]],
    });
  }


  onSubmit(){

    if(this.registerForm.valid){
      
      console.log(this.registerForm.value);

      const measurement = {
        date: this.registerForm.value.date,
        ph: Number(this.registerForm.value.ph),
        temperature: Number(this.registerForm.value.temperature),
        userId: Number(this.registerForm.value.userIdD),
        pollutantId: Number(this.registerForm.value.pollutantId),
        resourceId: Number(this.registerForm.value.resourceId),
      }

      this.measurementService.postMeasurement(measurement).subscribe({
        next: (response: any) => {
          console.log(response);
          alert("Successfully registered measurement");
          
          this.dialogRef.close();

        },
        error: (error) => {

            alert(error);
        }
    });



    }else{
      this.registerForm.markAllAsTouched();
    }
    
  }

}
