import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultResourcesComponent } from './consult-resources/consult-resources.component';
import { EditResourcesComponent } from './edit-resources/edit-resources.component';
import { CreateResourcesComponent } from './create-resources/create-resources.component';
import { ListResourcesComponent } from './list-resources/list-resources.component';
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
import { DisableResourcesComponent } from './disable-resources/disable-resources.component';

@NgModule({
  declarations: [
    ConsultResourcesComponent,
    EditResourcesComponent,
    CreateResourcesComponent,
    ListResourcesComponent,
    DisableResourcesComponent,
    
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
export class ResourcesModule { }
