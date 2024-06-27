import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PollutantService } from 'src/app/core/services/pollutant.service';
import { CreatePollutantsComponent } from '../create-pollutants/create-pollutants.component';
import { ConsultPollutantsComponent } from '../consult-pollutants/consult-pollutants.component';
import { EditPollutantsComponent } from '../edit-pollutants/edit-pollutants.component';
import { DisablePollutantsComponent } from '../disable-pollutants/disable-pollutants.component';

@Component({
  selector: 'app-list-pollutants',
  templateUrl: './list-pollutants.component.html',
  styleUrls: ['./list-pollutants.component.css']
})
export class ListPollutantsComponent implements OnInit, AfterViewInit {
  pollutants: any[] = [];
  displayedColumns: string[] = ['id','name','load', 'actions']
  dataSource = new MatTableDataSource<any>(this.pollutants);

  constructor(
    private pollutantService: PollutantService,
    public dialog: MatDialog
  ){}
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.fetchPollutants(); 
   }

   fetchPollutants() {
    this.pollutantService.getPollutants().subscribe({
      next:(response: any) => {
        this.pollutants = response;
        this.dataSource = new MatTableDataSource<any>(this.pollutants);
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

    const dialogRef = this.dialog.open(CreatePollutantsComponent,{
      width: '500px',
     //height: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      
      this.pollutantService.getPollutants().subscribe({
        next:(response: any) => {
          this.pollutants = response;
          this.dataSource = new MatTableDataSource<any>(this.pollutants);
          this.dataSource.paginator = this.paginator;
        },
        error:(error) => {
          console.log(error);
        }
      });
      
    });

  }

  retrievePollutant(pollutant: number) {
    const dialogRef = this.dialog.open(ConsultPollutantsComponent,{
      width: '500px',
     //height: '600px'
     data:{pollutant:pollutant}
    });


  }

  openDialogEdit(pollutant: number) {
    const dialogRefEdit = this.dialog.open(EditPollutantsComponent,{
      width: '500px',
     //height: '600px'
     data:{pollutant:pollutant}
    });

    dialogRefEdit.afterClosed().subscribe(result => {
      
      this.pollutantService.getPollutants().subscribe({
        next:(response: any) => {
          this.pollutants = response;
          this.dataSource = new MatTableDataSource<any>(this.pollutants);
          this.dataSource.paginator = this.paginator;
        },
        error:(error) => {
          console.log(error);
        }
      });
      
    });
  }
  destroyPollutant(pollutant: number) {
    const dialogRefInh = this.dialog.open(DisablePollutantsComponent,{
      width: '500px',
     //height: '600px'
     data:{pollutant:pollutant}
    });
    dialogRefInh.afterClosed().subscribe(result => {
      
      this.pollutantService.getPollutants().subscribe({
        next:(response: any) => {
          this.pollutants = response;
          this.dataSource = new MatTableDataSource<any>(this.pollutants);
          this.dataSource.paginator = this.paginator;
        },
        error:(error) => {
          console.log(error);
        }
      });
      
    });
  }

}
