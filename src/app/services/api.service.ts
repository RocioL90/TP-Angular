// src/app/services/api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/item.model';

@Injectable({
  providedIn: 'root'  // <-- Esto hace que esté disponible en toda la app
})
export class ApiService {
  private apiUrl = 'https://crudcrud.com/api/6deb10e3ca5c46a6bcd1111f0065b4c1/usuarios';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  getById(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  create(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario, this.httpOptions);
  }

  update(id: string, usuario: Usuario): Observable<Usuario> {
    console.log('ApiService.update called with:');
    console.log('ID:', id);
    console.log('Usuario:', usuario);
    console.log('URL:', `${this.apiUrl}/${id}`);
    
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario, this.httpOptions);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, this.httpOptions);
  }
}