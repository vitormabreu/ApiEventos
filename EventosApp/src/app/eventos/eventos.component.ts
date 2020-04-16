import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EventosService } from '../services/eventos.service';
import { Evento } from '../models/evento';


@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  eventos$: Observable<Evento[]>;

  constructor(private eventoService: EventosService) {
  }

  ngOnInit() {
    this.loadEventos();
  }

  loadEventos() {
    this.eventos$ = this.eventoService.getEventos();
  }

  delete(evento: Evento) {
    const ans = confirm(`Deseja deletar o evento de ${evento.nomeResponsavel} na ${evento.nomeSala}?`);
    if (ans) {
      this.eventoService.deleteEvento(evento.eventoId).subscribe((data) => {
        this.loadEventos();
      });
    }
  }

}
