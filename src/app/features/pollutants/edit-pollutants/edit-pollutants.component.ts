import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PollutantService } from 'src/app/core/services/pollutant.service';

@Component({
  selector: 'app-edit-pollutants',
  templateUrl: './edit-pollutants.component.html',
  styleUrls: ['./edit-pollutants.component.css']
})
export class EditPollutantsComponent implements OnInit {

  editForm!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pollutantService: PollutantService,
    private fb:FormBuilder,
    public dialogRef: MatDialogRef<EditPollutantsComponent>
  ){
    this.editForm = this.fb.group({
      name:['', Validators.required],
      load:['', Validators.required],
    })
  }
  
  ngOnInit(): void {
    const pollutant = this.data.pollutant;
    this.pollutantService.getPollutant(pollutant).subscribe({
      next: (response: any) => {
        const pollutantData = response;
        this.editForm = this.fb.group({
          name:[pollutantData.name, Validators.required],
          load:[pollutantData.type, Validators.required],
        })
      },
      error: (error: any) =>{

      }
    })
  }
  onSubmit(): void {
    const pollutantId = this.data.pollutant;
    console.log(this.editForm.value)
    if(this.editForm.valid) {
      const pollutant = {
        pollutantId: pollutantId,
        name: this.editForm.value.name,
        load: Number(this.editForm.value.load),
      }

      this.pollutantService. patchPollutant(pollutant).subscribe({
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
