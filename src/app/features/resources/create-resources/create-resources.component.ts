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
      name:['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]*$')]],
      type:['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]*$')]],
      latitude:['', [Validators.required, Validators.minLength(10), Validators.maxLength(13), Validators.pattern('^[0-9]*$')]],
      longitude:['', [Validators.required, Validators.minLength(10), Validators.maxLength(13), Validators.pattern('^[0-9]*$')]],
      location:['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]*$')]],
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
