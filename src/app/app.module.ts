import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule } from '@angular/forms';
import { DialogModule } from '@angular/cdk/dialog';
import { RouterModule } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table'
import {OverlayModule} from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BtnComponent } from './shared/components/btn/btn.component';

import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TodoDialogComponent } from './shared/components/todo-dialog/todo-dialog.component';

import { ReactiveFormsModule } from '@angular/forms';
import { FeaturesModule } from './features/features.module';
import { LoginComponent } from './shared/pages/login/login.component';
import { BoardsComponent } from './shared/pages/boards/boards.component';
import { ScrollComponent } from './shared/pages/scroll/scroll.component';
import { TableComponent } from './shared/pages/table/table.component';
import { BoardComponent } from './shared/pages/board/board.component';
import { RegisterComponent } from './shared/pages/register/register.component';
import { ResourcesModule } from './features/resources/resources.module';
import { EventsModule } from './features/events/events.module';
import { AlertsModule } from './features/alerts/alerts.module';
import { MeasurementsModule } from './features/measurements/measurements.module';
import { PollutantsModule } from './features/pollutants/pollutants.module';
import { MapComponent } from './shared/components/map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BtnComponent,
    BoardsComponent,
    NavbarComponent,
    BoardComponent,
    TodoDialogComponent,
    ScrollComponent,
    TableComponent,
    RegisterComponent,
    MapComponent,
  ],
  imports: [
    FeaturesModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ResourcesModule,
    EventsModule,
    CommonModule,
    AlertsModule,
    MeasurementsModule,
    PollutantsModule,
    OverlayModule,
    FormsModule,
    HttpClientModule,
    CdkAccordionModule,
    DragDropModule,
    DialogModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    HttpClientModule,
    ScrollingModule,
    CdkTableModule,
    ReactiveFormsModule
  ],
  exports:[
    RouterModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
