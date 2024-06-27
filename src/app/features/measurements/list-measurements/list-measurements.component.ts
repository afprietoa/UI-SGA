import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MeasurementService } from 'src/app/core/services/measurement.service';
import { CreateMeasurementsComponent } from '../create-measurements/create-measurements.component';
import { ConsultMeasurementsComponent } from '../consult-measurements/consult-measurements.component';
import { EditMeasurementsComponent } from '../edit-measurements/edit-measurements.component';
import { DisableMeasurementsComponent } from '../disable-measurements/disable-measurements.component';

@Component({
  selector: 'app-list-measurements',
  templateUrl: './list-measurements.component.html',
  styleUrls: ['./list-measurements.component.css']
})
export class ListMeasurementsComponent implements OnInit, AfterViewInit {
 
  measurements: any[] = [];
  displayedColumns: string[] = ['id','date','ph', 'temperature','userId','pollutant', 'resource', 'actions']
  dataSource = new MatTableDataSource<any>(this.measurements);

  constructor(
    private measurementService: MeasurementService,
    public dialog: MatDialog
  ){}
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.fetchMeasurements(); 
   }

   fetchMeasurements() {
    this.measurementService.getMeasurements().subscribe({
      next:(response: any) => {
        this.measurements = response;
        this.dataSource = new MatTableDataSource<any>(this.measurements);
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

    const dialogRef = this.dialog.open(CreateMeasurementsComponent,{
      width: '500px',
     //height: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      
      this.measurementService.getMeasurements().subscribe({
        next:(response: any) => {
          this.measurements = response;
          this.dataSource = new MatTableDataSource<any>(this.measurements);
          this.dataSource.paginator = this.paginator;
        },
        error:(error) => {
          console.log(error);
        }
      });
      
    });

  }

  retrieveMeasurement(measurement: number) {
    const dialogRef = this.dialog.open(ConsultMeasurementsComponent,{
      width: '500px',
     //height: '600px'
     data:{measurement:measurement}
    });


  }

  openDialogEdit(measurement: number) {
    const dialogRefEdit = this.dialog.open(EditMeasurementsComponent,{
      width: '500px',
     //height: '600px'
     data:{measurement:measurement}
    });

    dialogRefEdit.afterClosed().subscribe(result => {
      
      this.measurementService.getMeasurements().subscribe({
        next:(response: any) => {
          this.measurements = response;
          this.dataSource = new MatTableDataSource<any>(this.measurements);
          this.dataSource.paginator = this.paginator;
        },
        error:(error) => {
          console.log(error);
        }
      });
      
    });
  }
  destroyMeasurement(measurement: number) {
    const dialogRefInh = this.dialog.open(DisableMeasurementsComponent,{
      width: '500px',
     //height: '600px'
     data:{measurement:measurement}
    });
    dialogRefInh.afterClosed().subscribe(result => {
      
      this.measurementService.getMeasurements().subscribe({
        next:(response: any) => {
          this.measurements = response;
          this.dataSource = new MatTableDataSource<any>(this.measurements);
          this.dataSource.paginator = this.paginator;
        },
        error:(error) => {
          console.log(error);
        }
      });
      
    });
  }

}
