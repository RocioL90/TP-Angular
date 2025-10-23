// src/app/components/gestion-items/gestion-items.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-gestion-items',
  standalone: true,  // <-- Importante
  imports: [CommonModule, FormsModule],  // <-- Importante
  templateUrl: './gestion-items.component.html',
  styleUrls: ['./gestion-items.component.css']
})
export class GestionItemsComponent implements OnInit {
  items: Item[] = [];
  selectedItem: Item | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.apiService.getAll().subscribe({
      next: (data) => {
        this.items = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar items:', error);
        this.errorMessage = 'Error al cargar los datos';
        this.isLoading = false;
      }
    });
  }

  selectItem(item: Item): void {
    this.selectedItem = { ...item };
    if (!this.selectedItem.data) {
      this.selectedItem.data = {};
    }
  }

  addItem(item: Item): void {
    this.apiService.create(item).subscribe({
      next: (newItem) => {
        this.loadItems();
        this.selectedItem = null;
        alert('Dispositivo agregado exitosamente');
      },
      error: (error) => {
        console.error('Error al agregar item:', error);
        alert('Error al agregar el dispositivo');
      }
    });
  }

  updateItem(item: Item): void {
    if (item.id) {
      this.apiService.update(item.id, item).subscribe({
        next: () => {
          this.loadItems();
          this.selectedItem = null;
          alert('Dispositivo actualizado exitosamente');
        },
        error: (error) => {
          console.error('Error al actualizar item:', error);
          alert('Error al actualizar el dispositivo');
        }
      });
    }
  }

  deleteItem(id: string): void {
    if (confirm('¿Estás seguro de eliminar este dispositivo?')) {
      this.apiService.delete(id).subscribe({
        next: () => {
          this.loadItems();
          this.selectedItem = null;
          alert('Dispositivo eliminado exitosamente');
        },
        error: (error) => {
          console.error('Error al eliminar item:', error);
          alert('Error al eliminar el dispositivo');
        }
      });
    }
  }

  clearSelection(): void {
    this.selectedItem = null;
  }

  createNew(): void {
    this.selectedItem = {
      name: '',
      data: {}
    };
  }
}