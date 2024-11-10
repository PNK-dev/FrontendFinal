import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notas } from '../model/notas';

@Injectable({
  providedIn: 'root'
})
export class NotasService {
  private apiUrl = 'http://localhost:8080/api/notas';

  constructor(private http: HttpClient) { }

  getNotas(): Observable<Notas[]> {
    return this.http.get<Notas[]>(this.apiUrl);
  }

  getNotasById(id: number): Observable<Notas> {
    return this.http.get<Notas>(`${this.apiUrl}/${id}`);
  }

  createNotas(notas: Notas): Observable<Notas> {
    return this.http.post<Notas>(this.apiUrl, notas);
  }

  deleteNotas(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateNotas(notas: Notas, id: number): Observable<Notas> {
    return this.http.put<Notas>(`${this.apiUrl}/${id}`, notas);
  }
}
