import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultPollutantsComponent } from './consult-pollutants/consult-pollutants.component';
import { EditPollutantsComponent } from './edit-pollutants/edit-pollutants.component';
import { CreatePollutantsComponent } from './create-pollutants/create-pollutants.component';
import { ListPollutantsComponent } from './list-pollutants/list-pollutants.component';
import {MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DisablePollutantsComponent } from './disable-pollutants/disable-pollutants.component';

@NgModule({
  declarations: [
    ConsultPollutantsComponent,
    EditPollutantsComponent,
    CreatePollutantsComponent,
    ListPollutantsComponent,
    DisablePollutantsComponent,
    
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule,
  ]
})
export class PollutantsModule { }
