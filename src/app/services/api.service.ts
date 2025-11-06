import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'  // Disponible en toda la app
})
export class ApiService {
  private apiUrl = 'https://crudcrud.com/api/ffbe7f7cbd244090951d2d57f8ae6023/usuarios';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  // Obtener un usuario por su ID
  getById(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo usuario
  create(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario, this.httpOptions);
  }

  // Actualizar un usuario existente
  update(id: string, usuario: Usuario): Observable<Usuario> {
    // Crear una copia sin el campo id/_id porque crudcrud NO permite enviarlo
    const usuarioSinId = { ...usuario };
    delete (usuarioSinId as any)._id;
    delete (usuarioSinId as any).id;

    console.log('Actualizando usuario con ID:', id);
    console.log('Datos enviados:', usuarioSinId);

    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuarioSinId, this.httpOptions);
  }

  // Eliminar un usuario
  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, this.httpOptions);
  }
}
