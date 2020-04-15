import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventoComponent } from './evento/evento.component';
import { EventosComponent } from './eventos/eventos.component';
import { EventoAddEditComponent } from './evento-add-edit/evento-add-edit.component';


const routes: Routes = [
  { path: '', component: EventoComponent, pathMatch: 'full' },
  { path: 'eventos/:id', component: EventosComponent },
  { path: 'add', component: EventoAddEditComponent },
  { path: 'eventos/edit/:id', component: EventoAddEditComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
