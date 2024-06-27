import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourceService } from 'src/app/core/services/resource.service';

@Component({
  selector: 'app-edit-resources',
  templateUrl: './edit-resources.component.html',
  styleUrls: ['./edit-resources.component.css']
})
export class EditResourcesComponent implements OnInit {
  editForm!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private resourceService: ResourceService,
    private fb:FormBuilder,
    public dialogRef: MatDialogRef<EditResourcesComponent>
  ){
    this.editForm = this.fb.group({
      name:['', Validators.required],
      type:['', Validators.required],
      latitude:['', Validators.required],
      longitude:['', Validators.required],
      location:['', Validators.required]
    })
  }
  
  ngOnInit(): void {
    const resource = this.data.resource;
    this.resourceService.getResource(resource).subscribe({
      next: (response: any) => {
        const resourceData = response;
        this.editForm = this.fb.group({
          name:[resourceData.name, Validators.required],
          type:[resourceData.type, Validators.required],
          latitude:[resourceData.latitude, Validators.required],
          longitude:[resourceData.longitude, Validators.required],
          location:[resourceData.location, Validators.required],
        })
      },
      error: (error: any) =>{

      }
    })
  }
  onSubmit(): void {
    const resourceId = this.data.resource;
    console.log(this.editForm.value)
    if(this.editForm.valid) {
      const resource = {
        resourceId: resourceId,
        name: this.editForm.value.name,
        type: this.editForm.value.type,
        latitude: Number(this.editForm.value.latitude),
        longitude: Number(this.editForm.value.longitude),
        location: this.editForm.value.location,
      }

      this.resourceService. patchResource(resource).subscribe({
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
