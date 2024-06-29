import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PollutantService } from 'src/app/core/services/pollutant.service';

@Component({
  selector: 'app-create-pollutants',
  templateUrl: './create-pollutants.component.html',
  styleUrls: ['./create-pollutants.component.css']
})
export class CreatePollutantsComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pollutantService: PollutantService,
    public dialogRef: MatDialogRef<CreatePollutantsComponent>
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name:['', [Validators.required]],
      load:['', [Validators.required]],
    });
  }


  onSubmit(){

    if(this.registerForm.valid){
      
      console.log(this.registerForm.value);

      const pollutant = {
        name: this.registerForm.value.name,
        load: Number(this.registerForm.value.load),
      }

      this.pollutantService.postPollutant(pollutant).subscribe({
        next: (response: any) => {
          console.log(response);
          alert("Successfully registered pollutant");
          
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
