// src/app/components/usuario/usuario.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Usuario } from '../../models/item.model';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  selectedUsuario: Usuario | null = null;
  isLoading = false;
  errorMessage = '';
  showPopup = false;

  // Form fields for adding new usuario
  newUsuario: Usuario = {
    nombre: '',
    apellido: '',
    email: '',
    genero: ''
  };

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

  saveObject(): void {
    if (!this.newUsuario.nombre || !this.newUsuario.apellido || !this.newUsuario.email || !this.newUsuario.genero) {
      alert('Por favor completa todos los campos');
      return;
    }

    this.apiService.create(this.newUsuario).subscribe({
      next: (newUsuario) => {
        this.loadUsuarios();
        this.clearNewUsuarioForm();
        alert('Usuario agregado exitosamente');
      },
      error: (error) => {
        console.error('Error al agregar usuario:', error);
        alert('Error al agregar el usuario');
      }
    });
  }

  editUsuario(usuario: Usuario): void {
    console.log('editUsuario called with:', usuario);
    this.selectedUsuario = {
      _id: usuario._id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      genero: usuario.genero
    };
    this.showPopup = true;
    console.log('selectedUsuario after copy:', this.selectedUsuario);
  }

  updateObject(): void {
    console.log('updateObject called');
    console.log('selectedUsuario:', this.selectedUsuario);
    
    if (!this.selectedUsuario) {
      console.error('No hay usuario seleccionado');
      alert('No hay usuario seleccionado para actualizar');
      return;
    }

    if (!this.selectedUsuario._id) {
      console.error('El usuario no tiene ID');
      alert('El usuario no tiene ID válido');
      return;
    }

    if (!this.selectedUsuario.nombre || !this.selectedUsuario.apellido || !this.selectedUsuario.email || !this.selectedUsuario.genero) {
      console.error('Campos incompletos:', this.selectedUsuario);
      alert('Por favor completa todos los campos');
      return;
    }

    console.log('Enviando actualización para usuario ID:', this.selectedUsuario._id);
    console.log('Datos a enviar:', this.selectedUsuario);

    this.apiService.update(this.selectedUsuario._id, this.selectedUsuario).subscribe({
      next: (response) => {
        console.log('Actualización exitosa:', response);
        this.loadUsuarios();
        this.closePopup();
        alert('Usuario actualizado exitosamente');
      },
      error: (error) => {
        console.error('Error completo al actualizar usuario:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        console.error('Error body:', error.error);
        alert(`Error al actualizar el usuario: ${error.message || 'Error desconocido'}`);
      }
    });
  }

  deleteUsuario(id: string): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.apiService.delete(id).subscribe({
        next: () => {
          this.loadUsuarios();
          alert('Usuario eliminado exitosamente');
        },
        error: (error) => {
          console.error('Error al eliminar usuario:', error);
          alert('Error al eliminar el usuario');
        }
      });
    }
  }

  clearNewUsuarioForm(): void {
    this.newUsuario = {
      nombre: '',
      apellido: '',
      email: '',
      genero: ''
    };
  }

  closePopup(): void {
    this.showPopup = false;
    this.selectedUsuario = null;
  }
}
