import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResourceService } from 'src/app/core/services/resource.service';

@Component({
  selector: 'app-disable-resources',
  templateUrl: './disable-resources.component.html',
  styleUrls: ['./disable-resources.component.css']
})
export class DisableResourcesComponent implements OnInit {


  mensaje: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private resourceService: ResourceService,
    public dialogRef: MatDialogRef<DisableResourcesComponent>
  ){}

  ngOnInit(): void {
    const id = this.data.resource;

    console.log(id)

    
   this.resourceService.deleteResource(id).subscribe({
     next: (response: any) => {
       
      console.log(response);
      this.mensaje = "Resource deleted successfully!";
       
     },
     error: (error) => {
       console.log(error);
       this.mensaje = error.message;
       ;
     }
    });
  }

}
