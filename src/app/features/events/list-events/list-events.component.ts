import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EventService } from 'src/app/core/services/event.service';
import { CreateEventsComponent } from '../create-events/create-events.component';
import { ConsultEventsComponent } from '../consult-events/consult-events.component';
import { EditEventsComponent } from '../edit-events/edit-events.component';
import { DisableEventsComponent } from '../disable-events/disable-events.component';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css']
})
export class ListEventsComponent implements OnInit, AfterViewInit {
  
  events: any[] = [];
  displayedColumns: string[] = ['id','description','magnitude', 'date','pollutant','resource', 'actions']
  dataSource = new MatTableDataSource<any>(this.events);

  constructor(
    private eventService: EventService,
    public dialog: MatDialog
  ){}
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.fetchEvents(); 
   }

   fetchEvents() {
    this.eventService.getEvents().subscribe({
      next:(response: any) => {
        this.events = response;
        this.dataSource = new MatTableDataSource<any>(this.events);
        this.dataSource.paginator = this.paginator;
      },
      error:(error) => {
        console.log(error);
      }
  });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  openDialogRegister() {

    const dialogRef = this.dialog.open(CreateEventsComponent,{
      width: '500px',
     //height: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      
      this.eventService.getEvents().subscribe({
        next:(response: any) => {
          this.events = response;
          this.dataSource = new MatTableDataSource<any>(this.events);
          this.dataSource.paginator = this.paginator;
        },
        error:(error) => {
          console.log(error);
        }
      });
      
    });

  }

  retrieveEvent(event: number) {
    const dialogRef = this.dialog.open(ConsultEventsComponent,{
      width: '500px',
     //height: '600px'
     data:{event:event}
    });


  }

  openDialogEdit(event: number) {
    const dialogRefEdit = this.dialog.open(EditEventsComponent,{
      width: '500px',
     //height: '600px'
     data:{event:event}
    });

    dialogRefEdit.afterClosed().subscribe(result => {
      
      this.eventService.getEvents().subscribe({
        next:(response: any) => {
          this.events = response;
          this.dataSource = new MatTableDataSource<any>(this.events);
          this.dataSource.paginator = this.paginator;
        },
        error:(error) => {
          console.log(error);
        }
      });
      
    });
  }
  destroyEvent(event: number) {
    console.log(event)
    const dialogRefInh = this.dialog.open(DisableEventsComponent,{
      width: '500px',
     //height: '600px'
     data:{event:event}
    });
    dialogRefInh.afterClosed().subscribe(result => {
      
      this.eventService.getEvents().subscribe({
        next:(response: any) => {
          this.events = response;
          this.dataSource = new MatTableDataSource<any>(this.events);
          this.dataSource.paginator = this.paginator;
        },
        error:(error) => {
          console.log(error);
        }
      });
      
    });
  }

}
