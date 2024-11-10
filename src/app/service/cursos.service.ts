import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cursos } from '../model/cursos';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private apiUrl = 'http://localhost:8080/api/cursos';

  constructor(private http: HttpClient) { }

  // Obtener todos los cursos
  getCursos(): Observable<Cursos[]> {
    return this.http.get<Cursos[]>(this.apiUrl);
  }

  // Obtener un curso por ID
  getCursoById(id: number): Observable<Cursos> {
    return this.http.get<Cursos>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo curso
  createCurso(curso: Cursos): Observable<Cursos> {
    return this.http.post<Cursos>(this.apiUrl, curso);
  }

  // Eliminar un curso por ID
  deleteCurso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Actualizar un curso por ID
  updateCurso(curso: Cursos, id: number): Observable<Cursos> {
    return this.http.put<Cursos>(`${this.apiUrl}/${id}`, curso);
  }
}
