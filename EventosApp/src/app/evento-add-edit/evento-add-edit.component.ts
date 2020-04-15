import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EventosService } from '../services/eventos.service';
import { Evento } from '../models/evento';

@Component({
  selector: 'app-evento-add-edit',
  templateUrl: './evento-add-edit.component.html',
  styleUrls: ['./evento-add-edit.component.scss']
})
export class EventoAddEditComponent implements OnInit {

  form: FormGroup;
  actionType: string;
  formNomeResponsavel: string;
  formNomeSala: string;
  eventoId: number;
  errorMessage: any;
  existingEvento: Evento;

  // tslint:disable-next-line: max-line-length
  constructor(private eventosService: EventosService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) {
    const idParam = 'id';
    this.actionType = 'Criar';
    this.formNomeResponsavel = 'nomeResponsavel';
    this.formNomeSala = 'nomeSala';
    if (this.avRoute.snapshot.params[idParam]) {
      this.eventoId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {
        eventoId: 0,
        nomeResponsavel: ['', [Validators.required]],
        nomeSala: ['', [Validators.required]],
      }
    )
  }

  ngOnInit() {

    if (this.eventoId > 0) {
      this.actionType = 'Editar';
      this.eventosService.getEvento(this.eventoId)
        .subscribe(data => (
          this.existingEvento = data,
          this.form.controls[this.formNomeResponsavel].setValue(data.nomeResponsavel),
          this.form.controls[this.formNomeSala].setValue(data.nomeSala)
        ));
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    if (this.actionType === 'Criar') {
      let evento: Evento = {
        dtInicio: new Date(),
        dtFim: new Date(),
        nomeResponsavel: this.form.get(this.formNomeResponsavel).value,
        nomeSala: this.form.get(this.formNomeSala).value
      };

      this.eventosService.saveEvento(evento)
        .subscribe((data) => {
          this.router.navigate(['/blogpost', data.eventoId]);
        });
    }

    if (this.actionType === 'Editar') {
      let evento: Evento = {
        eventoId: this.existingEvento.eventoId,
        dtInicio: this.existingEvento.dtInicio,
        dtFim: this.existingEvento.dtFim,
        nomeResponsavel: this.form.get(this.formNomeResponsavel).value,
        nomeSala: this.form.get(this.formNomeSala).value
      };
      this.eventosService.updateEvento(evento.eventoId, evento)
        .subscribe((data) => {
          this.router.navigate([this.router.url]);
        });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

  get nomeResponsavel() { return this.form.get(this.formNomeResponsavel); }
  get nomeSala() { return this.form.get(this.formNomeSala); }

}
