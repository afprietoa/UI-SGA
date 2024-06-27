import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-edit-alerts',
  templateUrl: './edit-alerts.component.html',
  styleUrls: ['./edit-alerts.component.css']
})
export class EditAlertsComponent implements OnInit {

  editForm!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alertService: AlertService,
    private fb:FormBuilder,
    public dialogRef: MatDialogRef<EditAlertsComponent>
  ){
    this.editForm = this.fb.group({
      date:['', Validators.required],
      level:['', Validators.required],
      message:['', Validators.required],
      userId:['', Validators.required],
      eventId:['', Validators.required]
    })
  }
  
  ngOnInit(): void {
    const alert = this.data.alert;
    this.alertService.getAlert(alert).subscribe({
      next: (response: any) => {
        const alertData = response;
        this.editForm = this.fb.group({
          date:[alertData.date, Validators.required],
          level:[alertData.level, Validators.required],
          message:[alertData.message, Validators.required],
          userId:[alertData.userId, Validators.required],
          eventId:[alertData.eventId, Validators.required],
        })
      },
      error: (error: any) =>{

      }
    })
  }
  onSubmit(): void {
    const alertId = this.data.alert;
    console.log(this.editForm.value)
    if(this.editForm.valid) {
      const alert = {
        alertId: alertId,
        date: Number(this.editForm.value.date),
        level: this.editForm.value.level,
        message: this.editForm.value.message,
        userId: Number(this.editForm.value.userId),
        eventId: Number(this.editForm.value.eventId),
      }

      this.alertService. patchAlert(alert).subscribe({
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
