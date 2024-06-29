import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ResourceService } from 'src/app/core/services/resource.service';

@Component({
  selector: 'app-create-resources',
  templateUrl: './create-resources.component.html',
  styleUrls: ['./create-resources.component.css']
})
export class CreateResourcesComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private resourceService: ResourceService,
    public dialogRef: MatDialogRef<CreateResourcesComponent>
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name:['', [Validators.required ]],
      type:['', [Validators.required ]],
      latitude:['', [Validators.required]],
      longitude:['', [Validators.required]],
      location:['', [Validators.required ]],
    });
  }


  onSubmit(){

    if(this.registerForm.valid){
      
      console.log(this.registerForm.value);

      const resource = {
        name: this.registerForm.value.name,
        type: this.registerForm.value.type,
        latitude: Number(this.registerForm.value.latitude),
        longitude: Number(this.registerForm.value.longitude),
        location: this.registerForm.value.location,
      }

      this.resourceService.postResource(resource).subscribe({
        next: (response: any) => {
          console.log(response);
          alert("Successfully registered resource");
          
          this.dialogRef.close();

        },
        error: (error) => {

            alert(error);
        }
    });



    }else{
      this.registerForm.markAllAsTouched();
    }
    
  }

}
