import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEventsComponent } from './events/list-events/list-events.component';
import { ListAlertsComponent } from './alerts/list-alerts/list-alerts.component';
import { ListMeasurementsComponent } from './measurements/list-measurements/list-measurements.component';
import { ListPollutantsComponent } from './pollutants/list-pollutants/list-pollutants.component';
import { ListResourcesComponent } from './resources/list-resources/list-resources.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'main',
    component: HomeComponent,
    children: [
      {path: 'list-events', component: ListEventsComponent},
      {path: 'list-alerts', component: ListAlertsComponent},
      {path: 'list-measurements', component: ListMeasurementsComponent},
      {path: 'list-pollutants', component: ListPollutantsComponent},
      {path: 'list-resources', component: ListResourcesComponent},
      {path: '**', redirectTo: 'list-resources'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }