// src/app/models/item.model.ts

export interface DeviceData {
  [key: string]: any; // Permite propiedades dinámicas
  color?: string;
  capacity?: string;
  price?: number;
  year?: number;
  generation?: string;
}

export interface Item {
  id?: string;
  name: string;
  data?: DeviceData | null;
}

export interface Usuario {
  _id?: string;
  nombre: string;
  apellido: string;
  email: string;
  genero: string;
}