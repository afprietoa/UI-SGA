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
      date:['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)]],
      ph:['', [Validators.required, Validators.minLength(10), Validators.maxLength(13), Validators.pattern('^[0-9]*$')]],
      temperature:['', [Validators.required, Validators.minLength(10), Validators.maxLength(13), Validators.pattern('^[0-9]*$')]],
      userId:['', [Validators.required, Validators.minLength(10), Validators.maxLength(13), Validators.pattern('^[0-9]*$')]],
      pollutantId:['', [Validators.required, Validators.minLength(10), Validators.maxLength(13), Validators.pattern('^[0-9]*$')]],
      resourceId:['', [Validators.required, Validators.minLength(10), Validators.maxLength(13), Validators.pattern('^[0-9]*$')]],
    });
  }


  onSubmit(){

    if(this.registerForm.valid){
      
      console.log(this.registerForm.value);

      const measurement = {
        date: this.registerForm.value.date,
        ph: Number(this.registerForm.value.ph),
        temperature: Number(this.registerForm.value.temperature),
        userId: Number(this.registerForm.value.userId),
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
