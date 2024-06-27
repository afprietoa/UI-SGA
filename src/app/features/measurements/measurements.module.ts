import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultMeasurementsComponent } from './consult-measurements/consult-measurements.component';
import { EditMeasurementsComponent } from './edit-measurements/edit-measurements.component';
import { CreateMeasurementsComponent } from './create-measurements/create-measurements.component';
import { ListMeasurementsComponent } from './list-measurements/list-measurements.component';
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
import { DisableMeasurementsComponent } from './disable-measurements/disable-measurements.component';

@NgModule({
  declarations: [
    ConsultMeasurementsComponent,
    EditMeasurementsComponent,
    CreateMeasurementsComponent,
    ListMeasurementsComponent,
    DisableMeasurementsComponent,
    
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
export class MeasurementsModule { }
