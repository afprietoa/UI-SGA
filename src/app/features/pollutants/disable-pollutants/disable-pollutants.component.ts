import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PollutantService } from 'src/app/core/services/pollutant.service';

@Component({
  selector: 'app-disable-pollutants',
  templateUrl: './disable-pollutants.component.html',
  styleUrls: ['./disable-pollutants.component.css']
})
export class DisablePollutantsComponent implements OnInit {

  mensaje: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pollutantService: PollutantService,
    public dialogRef: MatDialogRef<DisablePollutantsComponent>
  ){}

  ngOnInit(): void {
    const id = this.data.pollutant;



    
   this.pollutantService.deletePollutant(id).subscribe({
     next: (response: any) => {
       
      console.log(response);
      this.mensaje = "Pollutant deleted successfully!";
       
     },
     error: (error) => {
       console.log(error);
       this.mensaje = error;
     }
    });
  }


}
