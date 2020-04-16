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
  formResponsavel: string;
  formSala: string;
  formdtInicio: string;
  formdtFinal: string;
  eventoId: number;
  errorMessage: any;
  existingEvento: Evento;

  // tslint:disable-next-line: max-line-length
  constructor(private eventosService: EventosService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) {
    const idParam = 'id';
    this.actionType = 'Criar';
    this.formResponsavel = 'nomeResponsavel';
    this.formSala = 'nomeSala';
    this.formdtInicio = 'dtInicio';
    this.formdtFinal = 'dtFinal';
    if (this.avRoute.snapshot.params[idParam]) {
      this.eventoId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {
        eventoId: 0,
        nomeResponsavel: ['', [Validators.required]],
        nomeSala: ['', [Validators.required]],
        dtInicio: ['', [Validators.required]],
        dtFinal: ['', [Validators.required]],
      }
    );
  }

  ngOnInit() {

    if (this.eventoId > 0) {
      this.actionType = 'Editar';
      this.eventosService.getEvento(this.eventoId)
        .subscribe(data => (
          this.existingEvento = data,
          this.form.controls[this.formResponsavel].setValue(data.nomeResponsavel),
          this.form.controls[this.formSala].setValue(data.nomeSala),
          this.form.controls[this.formdtInicio].setValue(data.dtInicio),
          this.form.controls[this.formdtFinal].setValue(data.dtFim)
        ));
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    if (this.actionType === 'Criar') {
      let evento: Evento = {
        dtInicio: this.form.get(this.formdtInicio).value,
        dtFim: this.form.get(this.formdtFinal).value,
        nomeResponsavel: this.form.get(this.formResponsavel).value,
        nomeSala: this.form.get(this.formSala).value
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
        nomeResponsavel: this.form.get(this.formResponsavel).value,
        nomeSala: this.form.get(this.formSala).value
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

  get nomeResponsavel() { return this.form.get(this.formResponsavel); }
  get nomeSala() { return this.form.get(this.formSala); }
  get dtInicio() { return this.form.get(this.formdtInicio); }
  get dtFinal() { return this.form.get(this.formdtFinal); }

}
