import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResourceService } from 'src/app/core/services/resource.service';

@Component({
  selector: 'app-consult-resources',
  templateUrl: './consult-resources.component.html',
  styleUrls: ['./consult-resources.component.css']
})
export class ConsultResourcesComponent implements OnInit {


  resourceData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private resourceService: ResourceService,
    public dialogRef: MatDialogRef<ConsultResourcesComponent>
  ){}

  ngOnInit(): void {
    const resource = this.data.resource;
    console.log(resource)
   this.resourceService.getResource(resource).subscribe({
     next:(response: any) => {
       
       this.resourceData = response;
       console.log(this.resourceData);
       
     },
     error:(error) => {
       console.log(error);
     }
    });
  }
}
