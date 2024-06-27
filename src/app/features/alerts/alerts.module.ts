import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultAlertsComponent } from './consult-alerts/consult-alerts.component';
import { EditAlertsComponent } from './edit-alerts/edit-alerts.component';
import { CreateAlertsComponent } from './create-alerts/create-alerts.component';
import { ListAlertsComponent } from './list-alerts/list-alerts.component';
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
import { DisableAlertsComponent } from './disable-alerts/disable-alerts.component';

@NgModule({
  declarations: [
    ConsultAlertsComponent,
    EditAlertsComponent,
    CreateAlertsComponent,
    ListAlertsComponent,
    DisableAlertsComponent,
    
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
export class AlertsModule { }
