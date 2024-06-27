import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-consult-events',
  templateUrl: './consult-events.component.html',
  styleUrls: ['./consult-events.component.css']
})
export class ConsultEventsComponent implements OnInit {


  eventData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private eventService: EventService,
    public dialogRef: MatDialogRef<ConsultEventsComponent>
  ){}

  ngOnInit(): void {
    const event = this.data.event;
    console.log(event)
   this.eventService.getEvent(event).subscribe({
     next:(response: any) => {
       
       this.eventData = response;
       console.log(this.eventData);
       
     },
     error:(error) => {
       console.log(error);
     }
    });
  }

}
