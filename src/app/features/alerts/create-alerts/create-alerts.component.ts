import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-create-alerts',
  templateUrl: './create-alerts.component.html',
  styleUrls: ['./create-alerts.component.css']
})
export class CreateAlertsComponent implements OnInit {


  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<CreateAlertsComponent>
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      date:['', [Validators.required]],
      level:['', [Validators.required]],
      message:['', [Validators.required]],
      userId:['', [Validators.required]],
      eventId:['', [Validators.required]],
    });
  }


  onSubmit(){

    if(this.registerForm.valid){
      
      console.log(this.registerForm.value);

      const alert = {
        date: this.registerForm.value.date,
        level: this.registerForm.value.level,
        message: this.registerForm.value.message,
        userId: Number(this.registerForm.value.userId),
        eventId: Number(this.registerForm.value.eventId),
      }

      this.alertService.postAlert(alert).subscribe({
        next: (response: any) => {
          console.log(response);
          //alert("Successfully registered measurement");
          
          this.dialogRef.close();

        },
        error: (error) => {

            //alert(error);
        }
    });



    }else{
      this.registerForm.markAllAsTouched();
    }
    
  }
}
