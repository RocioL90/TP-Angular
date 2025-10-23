// src/app/services/api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'  // <-- Esto hace que esté disponible en toda la app
})
export class ApiService {
  private apiUrl = 'https://api.restful-api.dev/objects';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getAll(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  getById(id: string): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${id}`);
  }

  create(item: Item): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item, this.httpOptions);
  }

  update(id: string, item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/${id}`, item, this.httpOptions);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, this.httpOptions);
  }
}