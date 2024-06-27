import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PollutantService } from 'src/app/core/services/pollutant.service';
@Component({
  selector: 'app-consult-pollutants',
  templateUrl: './consult-pollutants.component.html',
  styleUrls: ['./consult-pollutants.component.css']
})
export class ConsultPollutantsComponent implements OnInit {

  pollutantData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pollutantService: PollutantService,
    public dialogRef: MatDialogRef<ConsultPollutantsComponent>
  ){}

  ngOnInit(): void {
    const pollutant = this.data.pollutant;
    console.log(pollutant)
   this.pollutantService.getPollutant(pollutant).subscribe({
     next:(response: any) => {
       
       this.pollutantData = response;
       console.log(this.pollutantData);
       
     },
     error:(error) => {
       console.log(error);
     }
    });
  }

}
