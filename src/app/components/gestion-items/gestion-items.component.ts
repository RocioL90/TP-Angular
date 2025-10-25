// src/app/components/gestion-items/gestion-items.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Usuario } from '../../models/item.model';

@Component({
  selector: 'app-gestion-items',
  standalone: true,  // <-- Importante
  imports: [CommonModule, FormsModule],  // <-- Importante
  templateUrl: './gestion-items.component.html',
  styleUrls: ['./gestion-items.component.css']
})
export class GestionItemsComponent implements OnInit {
  usuarios: Usuario[] = [];
  selectedUsuario: Usuario | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.apiService.getAll().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
        this.errorMessage = 'Error al cargar los datos';
        this.isLoading = false;
      }
    });
  }

  selectUsuario(usuario: Usuario): void {
    this.selectedUsuario = { ...usuario };
  }

  addUsuario(usuario: Usuario): void {
    this.apiService.create(usuario).subscribe({
      next: (newUsuario) => {
        this.loadUsuarios();
        this.selectedUsuario = null;
        alert('Usuario agregado exitosamente');
      },
      error: (error) => {
        console.error('Error al agregar usuario:', error);
        alert('Error al agregar el usuario');
      }
    });
  }

  updateUsuario(usuario: Usuario): void {
    if (usuario._id) {
      this.apiService.update(usuario._id, usuario).subscribe({
        next: () => {
          this.loadUsuarios();
          this.selectedUsuario = null;
          alert('Usuario actualizado exitosamente');
        },
        error: (error) => {
          console.error('Error al actualizar usuario:', error);
          alert('Error al actualizar el usuario');
        }
      });
    }
  }

  deleteUsuario(id: string): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.apiService.delete(id).subscribe({
        next: () => {
          this.loadUsuarios();
          this.selectedUsuario = null;
          alert('Usuario eliminado exitosamente');
        },
        error: (error) => {
          console.error('Error al eliminar usuario:', error);
          alert('Error al eliminar el usuario');
        }
      });
    }
  }

  clearSelection(): void {
    this.selectedUsuario = null;
  }

  createNew(): void {
    this.selectedUsuario = {
      nombre: '',
      apellido: '',
      email: '',
      genero: ''
    };
  }
}