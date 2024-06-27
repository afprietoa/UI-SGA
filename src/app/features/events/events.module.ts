import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultEventsComponent } from './consult-events/consult-events.component';
import { EditEventsComponent } from './edit-events/edit-events.component';
import { CreateEventsComponent } from './create-events/create-events.component';
import { ListEventsComponent } from './list-events/list-events.component';
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
import { DisableEventsComponent } from './disable-events/disable-events.component';

@NgModule({
  declarations: [
    ConsultEventsComponent,
    EditEventsComponent,
    CreateEventsComponent,
    ListEventsComponent,
    DisableEventsComponent,
    
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
export class EventsModule { }
