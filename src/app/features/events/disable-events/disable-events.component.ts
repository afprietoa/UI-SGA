import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-disable-events',
  templateUrl: './disable-events.component.html',
  styleUrls: ['./disable-events.component.css']
})
export class DisableEventsComponent implements OnInit {



  mensaje: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private eventService: EventService,
    public dialogRef: MatDialogRef<DisableEventsComponent>
  ){}

  ngOnInit(): void {
    const id = this.data.event;



    
   this.eventService.deleteEvent(id).subscribe({
     next: (response: any) => {
       
      console.log(response);
      this.mensaje = "Event deleted successfully!";
       
     },
     error: (error) => {
       console.log(error);
       this.mensaje = "Event deleted successfully!";
     }
    });
  }

}
