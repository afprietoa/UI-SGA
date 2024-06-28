import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { MapComponent } from './shared/components/map/map.component';
import { BoardComponent } from './shared/pages/board/board.component';
import { BoardsComponent } from './shared/pages/boards/boards.component';
import { LoginComponent } from './shared/pages/login/login.component';
import { RegisterComponent } from './shared/pages/register/register.component';
import { ScrollComponent } from './shared/pages/scroll/scroll.component';
import { TableComponent } from './shared/pages/table/table.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'boards', component:BoardsComponent},
  {path: 'board', component:BoardComponent},
  {path: 'scroll', component:ScrollComponent},
  {path: 'table', component:TableComponent},
  {path: 'map', component:MapComponent},
  {path: 'main', component:HomeComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
