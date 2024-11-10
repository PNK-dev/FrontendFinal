import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumnos } from '../model/alumnos';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private apiUrl = 'http://localhost:8080/api/alumnos';

  constructor(private http: HttpClient) { }

  // Obtener todos los alumnos
  getAlumnos(): Observable<Alumnos[]> {
    return this.http.get<Alumnos[]>(this.apiUrl);
  }

  // Obtener un alumno por ID
  getAlumnoById(id: number): Observable<Alumnos> {
    return this.http.get<Alumnos>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo alumno
  createAlumno(alumno: Alumnos): Observable<Alumnos> {
    return this.http.post<Alumnos>(this.apiUrl, alumno);
  }

  // Eliminar un alumno por ID
  deleteAlumno(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Actualizar un alumno por ID
  updateAlumno(alumno: Alumnos, id: number): Observable<Alumnos> {
    return this.http.put<Alumnos>(`${this.apiUrl}/${id}`, alumno);
  }
}
