import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventosComponent } from './eventos/eventos.component';
import { EventoComponent } from './evento/evento.component';
import { EventoAddEditComponent } from './evento-add-edit/evento-add-edit.component';
import { EventosService } from './services/eventos.service';

@NgModule({
  declarations: [
    AppComponent,
    EventosComponent,
    EventoComponent,
    EventoAddEditComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    EventosService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
