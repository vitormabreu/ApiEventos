import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EventosService } from '../services/eventos.service';
import { Evento } from '../models/evento';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss']
})
export class EventoComponent implements OnInit {

  evento$: Observable<Evento>;
  eventoId: number;

  constructor(private eventoService: EventosService, private avRoute: ActivatedRoute) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.eventoId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit() {
    this.loadEvento();
  }

  loadEvento() {
    this.evento$ = this.eventoService.getEvento(this.eventoId);
  }

}
