import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ResourceService } from 'src/app/core/services/resource.service';
import { CreateResourcesComponent } from '../create-resources/create-resources.component';
import { ConsultResourcesComponent } from '../consult-resources/consult-resources.component';
import { EditResourcesComponent } from '../edit-resources/edit-resources.component';
import { DisableResourcesComponent } from '../disable-resources/disable-resources.component';

@Component({
  selector: 'app-list-resources',
  templateUrl: './list-resources.component.html',
  styleUrls: ['./list-resources.component.css']
})
export class ListResourcesComponent implements OnInit, AfterViewInit {
 
  resources: any[] = [];
  displayedColumns: string[] = ['id','name','type', 'latitude','longitude','location', 'actions']
  dataSource = new MatTableDataSource<any>(this.resources);

  constructor(
    private resourceService: ResourceService,
    public dialog: MatDialog
  ){}
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.fetchResources();
  //   this.resourceService.getResources().subscribe({
  //     next:(response: any) => {
  //       this.resources = response;
  //       this.dataSource = new MatTableDataSource<any>(this.resources);
  //       this.dataSource.paginator = this.paginator;
  //     },
  //     error:(error) => {
  //       console.log(error);
  //     }
  // });
  }
  fetchResources() {
    this.resourceService.getResources().subscribe({
      next: (response: any) => {
        this.resources = response;
        this.dataSource = new MatTableDataSource<any>(this.resources);
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => console.log(error)
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

    const dialogRef = this.dialog.open(CreateResourcesComponent,{
      width: '500px',
     //height: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      
      this.resourceService.getResources().subscribe({
        next:(response: any) => {
          this.resources = response;
          this.dataSource = new MatTableDataSource<any>(this.resources);
          this.dataSource.paginator = this.paginator;
        },
        error:(error) => {
          console.log(error);
        }
      });
      
    });

  }

  retrieveResource(resource: number) {
    const dialogRef = this.dialog.open(ConsultResourcesComponent,{
      width: '500px',
     //height: '600px'
     data:{resource:resource}
    });


  }

  openDialogEdit(resource: number) {
    const dialogRefEdit = this.dialog.open(EditResourcesComponent,{
      width: '500px',
     //height: '600px'
     data:{resource:resource}
    });

    dialogRefEdit.afterClosed().subscribe(result => {
      
      this.resourceService.getResources().subscribe({
        next:(response: any) => {
          this.resources = response;
          this.dataSource = new MatTableDataSource<any>(this.resources);
          this.dataSource.paginator = this.paginator;
        },
        error:(error) => {
          console.log(error);
        }
      });
      
    });
  }
  destroyResource(event: number) {
    const dialogRefInh = this.dialog.open(DisableResourcesComponent,{
      width: '500px',
     //height: '600px'
     data:{event:event}
    });
    dialogRefInh.afterClosed().subscribe(result => {
      
      this.resourceService.getResources().subscribe({
        next:(response: any) => {
          this.resources = response;
          this.dataSource = new MatTableDataSource<any>(this.resources);
          this.dataSource.paginator = this.paginator;
        },
        error:(error) => {
          console.log(error);
        }
      });
      
    });
  }
}