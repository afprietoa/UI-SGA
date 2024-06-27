import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/core/services/alert.service';
import { CreateAlertsComponent } from '../create-alerts/create-alerts.component';
import { ConsultAlertsComponent } from '../consult-alerts/consult-alerts.component';
import { EditAlertsComponent } from '../edit-alerts/edit-alerts.component';
import { DisableAlertsComponent } from '../disable-alerts/disable-alerts.component';

@Component({
  selector: 'app-list-alerts',
  templateUrl: './list-alerts.component.html',
  styleUrls: ['./list-alerts.component.css']
})
export class ListAlertsComponent implements OnInit, AfterViewInit {

  
  alerts: any[] = [];
  displayedColumns: string[] = ['id','date','level', 'message','userId','event', 'pollutant','resource','actions']
  dataSource = new MatTableDataSource<any>(this.alerts);

  constructor(
    private alertService: AlertService,
    public dialog: MatDialog
  ){}
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.fetchAlerts(); 
   }

   fetchAlerts() {
    this.alertService.getAlerts().subscribe({
      next:(response: any) => {
        this.alerts = response;
        this.dataSource = new MatTableDataSource<any>(this.alerts);
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

    const dialogRef = this.dialog.open(CreateAlertsComponent,{
      width: '500px',
     //height: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      
      this.alertService.getAlerts().subscribe({
        next:(response: any) => {
          this.alerts = response;
          this.dataSource = new MatTableDataSource<any>(this.alerts);
          this.dataSource.paginator = this.paginator;
        },
        error:(error) => {
          console.log(error);
        }
      });
      
    });

  }

  retrieveAlert(alert: number) {
    const dialogRef = this.dialog.open(ConsultAlertsComponent,{
      width: '500px',
     //height: '600px'
     data:{alert:alert}
    });


  }

  openDialogEdit(alert: number) {
    const dialogRefEdit = this.dialog.open(EditAlertsComponent,{
      width: '500px',
     //height: '600px'
     data:{alert:alert}
    });

    dialogRefEdit.afterClosed().subscribe(result => {
      
      this.alertService.getAlerts().subscribe({
        next:(response: any) => {
          this.alerts = response;
          this.dataSource = new MatTableDataSource<any>(this.alerts);
          this.dataSource.paginator = this.paginator;
        },
        error:(error) => {
          console.log(error);
        }
      });
      
    });
  }
  destroyAlert(alert: number) {
    const dialogRefInh = this.dialog.open(DisableAlertsComponent,{
      width: '500px',
     //height: '600px'
     data:{alert:alert}
    });
    dialogRefInh.afterClosed().subscribe(result => {
      
      this.alertService.getAlerts().subscribe({
        next:(response: any) => {
          this.alerts = response;
          this.dataSource = new MatTableDataSource<any>(this.alerts);
          this.dataSource.paginator = this.paginator;
        },
        error:(error) => {
          console.log(error);
        }
      });
      
    });
  }


}
