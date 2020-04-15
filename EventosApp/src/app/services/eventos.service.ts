import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Evento } from '../models/evento';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/Eventos/';
  }

  getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.myAppUrl + this.myApiUrl)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  getEvento(eventoId: number): Observable<Evento> {
    return this.http.get<Evento>(this.myAppUrl + this.myApiUrl + eventoId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  saveEvento(Evento): Observable<Evento> {
    return this.http.post<Evento>(this.myAppUrl + this.myApiUrl, JSON.stringify(Evento), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updateEvento(eventoId: number, Evento): Observable<Evento> {
    return this.http.put<Evento>(this.myAppUrl + this.myApiUrl + eventoId, JSON.stringify(Evento), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteEvento(eventoId: number): Observable<Evento> {
    return this.http.delete<Evento>(this.myAppUrl + this.myApiUrl + eventoId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
