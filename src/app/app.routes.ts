import { Routes } from '@angular/router';
import { GestionItemsComponent } from './components/gestion-items/gestion-items.component';

export const routes: Routes = [
  { path: '', component: GestionItemsComponent },
  { path: '**', redirectTo: '' }
];