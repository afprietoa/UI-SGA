import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-edit-events',
  templateUrl: './edit-events.component.html',
  styleUrls: ['./edit-events.component.css']
})
export class EditEventsComponent implements OnInit {

  editForm!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private eventService: EventService,
    private fb:FormBuilder,
    public dialogRef: MatDialogRef<EditEventsComponent>
  ){
    this.editForm = this.fb.group({
      description:['', Validators.required],
      magnitude:['', Validators.required],
      date:['', Validators.required],
      pollutantId:['', Validators.required],
      resourceId:['', Validators.required]
    })
  }
  
  ngOnInit(): void {
    const event = this.data.event;
    this.eventService.getEvent(event).subscribe({
      next: (response: any) => {
        const eventData = response;
        this.editForm = this.fb.group({
          description:[eventData.description, Validators.required],
          magnitude:[eventData.magnitude, Validators.required],
          date:[eventData.date, Validators.required],
          pollutantId:[eventData.pollutant.pollutantId, Validators.required],
          resourceId:[eventData.resource.resourceId, Validators.required],
        })
      },
      error: (error: any) =>{

      }
    })
  }
  onSubmit(): void {
    const eventId = this.data.event;
    console.log(this.editForm.value)
    if(this.editForm.valid) {
      const event = {
        eventId: eventId,
        description: this.editForm.value.description,
        magnitude: this.editForm.value.magnitude,
        date: this.editForm.value.date,
        pollutantId: Number(this.editForm.value.pollutantId),
        resourceId: Number(this.editForm.value.resourceId),
      }

      this.eventService. patchEvent(event).subscribe({
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
