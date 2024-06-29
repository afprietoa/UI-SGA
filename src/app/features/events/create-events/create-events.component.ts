import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-create-events',
  templateUrl: './create-events.component.html',
  styleUrls: ['./create-events.component.css']
})
export class CreateEventsComponent implements OnInit {


  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    public dialogRef: MatDialogRef<CreateEventsComponent>
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      description:['', [Validators.required]],
      magnitude:['', [Validators.required]],
      date:['', [Validators.required]],
      pollutantId:['', [Validators.required]],
      resourceId:['', [Validators.required]],
    });
  }


  onSubmit(){

    if(this.registerForm.valid){
      
      console.log(this.registerForm.value);

      const event = {
        description: this.registerForm.value.description,
        magnitude: this.registerForm.value.magnitude,
        date: this.registerForm.value.date,
        pollutantId: Number(this.registerForm.value.pollutantId),
        resourceId: Number(this.registerForm.value.resourceId),
      }

      this.eventService.postEvent(event).subscribe({
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
