import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EventosService } from '../services/eventos.service';
import { SalasService } from '../services/salas.service';
import { Evento } from '../models/evento';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

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
  salas: any;
  errorMessage: any;
  existingEvento: Evento;

  // tslint:disable-next-line: max-line-length
  constructor(private eventosService: EventosService,
    private toastr: ToastrService,
    private salasService: SalasService,
    private formBuilder: FormBuilder,
    private avRoute: ActivatedRoute,
    private router: Router) {
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

    this.salasService.getSalas()
      .subscribe(data => (
        this.salas = data
      ));

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

  async save() {
    if (!this.form.valid)
      return;
    
    if(!this.dateIsValid())
      return;

    let eventos = await this.allEvents();

    if (this.actionType === 'Criar') {
      let evento: Evento = {
        dtInicio: this.form.get(this.formdtInicio).value,
        dtFim: this.form.get(this.formdtFinal).value,
        nomeResponsavel: this.form.get(this.formResponsavel).value,
        nomeSala: this.form.get(this.formSala).value
      };

      if (this.roomIsBusy(evento, eventos))
        return;

      this.eventosService.saveEvento(evento)
        .subscribe((data) => {
          this.router.navigate(['/eventos', data.eventoId]);
        });
    }

    if (this.actionType === 'Editar') {
      let evento: Evento = {
        eventoId: this.existingEvento.eventoId,
        dtInicio: this.form.get(this.formdtInicio).value,
        dtFim: this.form.get(this.formdtFinal).value,
        nomeResponsavel: this.form.get(this.formResponsavel).value,
        nomeSala: this.form.get(this.formSala).value
      };

      if (this.roomIsBusy(evento, eventos))
        return;

      this.eventosService.updateEvento(evento.eventoId, evento)
        .subscribe((data) => {
          this.router.navigate(['/eventos']);
        });
    }
  }

  dateIsValid(): boolean {
    let dtInicio = this.form.get(this.formdtInicio).value;
    let dtFim = this.form.get(this.formdtFinal).value;

    if (moment(dtInicio).isAfter(moment(dtFim))){
      this.toastr.warning('Data inicial não pode ser posterior a data final.')
      return false;
    }
    return true;
  }

  roomIsBusy(evt: Evento, listaEventos: Evento[]): boolean {
    let msmSala = listaEventos.filter(e => e.nomeSala == evt.nomeSala && e.eventoId != evt.eventoId);

    if (msmSala.length == 0)
      return false;
    else {
      for (let i = 0; i < msmSala.length; i++) {
        const item = msmSala[i];
        if (moment(evt.dtInicio).isBetween(item.dtInicio, item.dtFim)
          || moment(evt.dtFim).isBetween(item.dtInicio, item.dtFim)
          || moment(evt.dtInicio).format('DD/MM/YYYY HH:mm:ss') == moment(item.dtInicio).format('DD/MM/YYYY HH:mm:ss')
          || moment(evt.dtFim).format('DD/MM/YYYY HH:mm:ss') == moment(item.dtFim).format('DD/MM/YYYY HH:mm:ss')) {
          this.toastr.warning(`A ${evt.nomeSala} já está reseravada para esta data no horário de ${moment(item.dtInicio).format('HH:mm')} às ${moment(item.dtFim).format('HH:mm')} .`);
          return true;
        }
      }

      return false;
    }

  }

  allEvents(): any {
    return new Promise((resolve) => {
      this.eventosService.getEventos().subscribe(
        (data: any) => {
          resolve(data)
        });
    });
  }


  cancel() {
    this.router.navigate(['/']);
  }

  get nomeResponsavel() { return this.form.get(this.formResponsavel); }
  get nomeSala() { return this.form.get(this.formSala); }
  get dtInicio() { return this.form.get(this.formdtInicio); }
  get dtFinal() { return this.form.get(this.formdtFinal); }

}
